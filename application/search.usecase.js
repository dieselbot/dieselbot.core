const GooglePlacesService = require('../services/google.places');
const FuelStopRepo = require('../repository/fuelstop.repo');
const FuelSolution = require('../domain/fuel.solution');
const Result = require('../domain/result');

class SearchUseCase {
    constructor(
        fuel_solution = new FuelSolution(),
        places_service = new GooglePlacesService(),
        fuel_stop_repo = new FuelStopRepo()
    ) {
        this.fuel_solution = fuel_solution;
        this.places_service = places_service;
        this.fuel_stop_repo = fuel_stop_repo;
        this.new_fuel_stops = [];
    }
    
    search_database = (fuelStop) => this.fuel_stop_repo.findOne(fuelStop);

    async search_google(fuelStop){
        const result = await this.places_service.findPlace(fuelStop.search_phrase);
        return { ...result, ...fuelStop.dto };
    }

    async execute() {
        const _result = new Result();

        try {
            this.fuel_solution.read();
        } catch (error) {
            _result.message = error.message;
            return _result;
        }

        const searchResults = [];

        for (const [,fuelStop] of this.fuel_solution.fuel_stops) {

            let searchResult = await this.search_database(fuelStop);

            if (!searchResult) {
                searchResult = await this.search_google(fuelStop);
                if(searchResult){
                    this.new_fuel_stops.push(searchResult);
                } else {
                    console.warn(`no results found for query: "${fuelStop.search_phrase}"`, searchResult);
                }
            }

            searchResults.push(searchResult);
        }

        if(searchResults.length > 0){
            _result.success = true;
            _result.data = searchResults;
        } else {
            _result.message = "no results found";
        }
        
        return _result;
    }
}

module.exports = SearchUseCase;