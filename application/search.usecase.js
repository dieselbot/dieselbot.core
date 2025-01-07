const GooglePlacesService = require('../services/google.places');
const FuelStopRepo = require('../repository/fuelstop.repo');
const FuelStop = require('../domain/fuel.stop');
const FuelSolution = require('../domain/fuel.solution');

class SearchUseCase {
    constructor(
        fuel_solution = new FuelSolution(),
        places_service = new GooglePlacesService(),
        fuel_stop_repo = new FuelStopRepo()
    ) {
        this.fuel_solution = fuel_solution;
        this.places_service = places_service;
        this.fuel_stop_repo = fuel_stop_repo;
        this.missing_fuel_stops = [];
    }
    
    search_database = (fuelStop) => this.fuel_stop_repo.findOne(fuelStop);

    async search_google(fuelStop){
        let result = await this.places_service.findPlace(fuelStop.search_phrase);
        return { ...result, ...fuelStop.dto };
    }

    async execute() {
        this.fuel_solution.read();

        const results = [];

        for (const [,fuelStop] of this.fuel_solution.fuel_stops) {

            let result = await this.search_database(fuelStop);

            if (!result) {
                result = await this.search_google(fuelStop);
                if(result){
                    this.missing_fuel_stops.push(result);
                } else {
                    console.warn(`no results found for query: "${fuelStop.search_phrase}"`, result);
                }
            }

            results.push(result);
        }

        return Promise.all(results);
    }
}

module.exports = SearchUseCase;