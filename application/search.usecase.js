const GooglePlacesService = require('../services/google.places');
const FuelStopRepo = require('../repository/fuelstop.repo');
const FuelSolution = require('../domain/fuel.solution');
const SearchResult = require('../domain/search.result');
const globalEmitter = require('../common/global.emitter');
const { found, search } = require('../common/constants.json')

class SearchUseCase {
    #_unlisted_fuel_stops = [];
    constructor(
        fuel_solution = new FuelSolution(),
        places_service = new GooglePlacesService(),
        fuel_stop_repo = new FuelStopRepo()
    ) {
        this.fuel_solution = fuel_solution;
        this.places_service = places_service;
        this.fuel_stop_repo = fuel_stop_repo;
    }

    async execute() {
        const result = new SearchResult();

        try {
            this.fuel_solution.read();
        } catch (error) {
            result.error = error;
            result.message = error.message;
            return result;
        }

        result.data = [];

        for (const [id, fuel_stop] of this.fuel_solution.fuel_stops) {

            let search_result = await this.fuel_stop_repo.findOne(id);

            if (!search_result) {
                search_result = await this.places_service.findPlace(fuel_stop);
                if (search_result) {
                    this.#_unlisted_fuel_stops.push(search_result);
                } else {
                    result.not_found.push(fuel_stop);
                    continue;
                }
            }

            result.data.push(search_result);
        }

        if (result.data.length) {
            result.success = true;
            if (this.#_unlisted_fuel_stops.length) {
                globalEmitter.emit(found.unlisted_fuel_stops, this.#_unlisted_fuel_stops);
            }
        } else {
            result.message = "no results found";
        }

        return result;
    }
}

module.exports = SearchUseCase;