const GooglePlacesService = require('../services/google.places');
const FuelStopRepo = require('../repository/fuelstop.repo');
const FuelSolution = require('../domain/fuel.solution');
const Result = require('../domain/result');
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
        const result = new Result();

        try {
            this.fuel_solution.read();
        } catch (error) {
            result.error = error;
            result.message = error.message;
            return result;
        }

        globalEmitter.emit(search.did_begin);

        result.data = [];

        const not_found = [];

        for (const [id, fuel_stop] of this.fuel_solution.fuel_stops) {

            let search_result = await this.fuel_stop_repo.findOne(id);

            if (!search_result) {
                search_result = await this.places_service.findPlace(fuel_stop);
                if (search_result) {
                    this.#_unlisted_fuel_stops.push(search_result);
                } else {
                    not_found.push(String(fuel_stop));
                    continue;
                }
            }

            result.data.push(search_result);
        }

        if (result.data.length) {
            result.success = true;
            if (not_found.length) {
                result.message = not_found.reduce((messages, message) => (
                    messages.concat('\n', message)
                ), "no results found for:")
            }
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