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
    async execute() {
        this.fuel_solution.read();
        const fuelStops = this.fuel_solution.fuel_stops;
        const results = [];

        for (const [key, fuelStop] of fuelStops) {

            let result = await this.fuel_stop_repo.findOne(fuelStop);

            if (!result) {
                result = await this.places_service.findPlace(fuelStop.search_phrase);
                result = { ...result, ...fuelStop.dto };
                if(FuelStop.isValid(result)){
                    this.missing_fuel_stops.push(result);
                } else {
                    console.log(`no results found for query: "${fuelStop.search_phrase}"`, result);
                }
            }

            results.push(result);
        }

        return Promise.all(results);
    }
}

module.exports = SearchUseCase;