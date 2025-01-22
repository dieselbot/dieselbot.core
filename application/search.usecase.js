const GooglePlacesService = require('../services/google.places');
const FuelStopRepo = require('../repository/fuelstop.repo');
const FuelSolution = require('../domain/fuel.solution');
const Result = require('../domain/result');
const globalEmitter = require('../common/global.emitter');

class SearchUseCase {
    #unlisted_fuel_stops = [];
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
            result.message = error.message;
            return result;
        }

        result.data = [];

        for (const [, fuel_stop] of this.fuel_solution.fuel_stops) {

            let search_result = await this.fuel_stop_repo.findOne(fuel_stop);

            if (!search_result) {
                 search_result = await this.places_service.findPlace(fuel_stop);
                if (search_result) {
                    this.#unlisted_fuel_stops.push(search_result);
                } else {
                    continue;
                }
            }

            result.data.push(search_result);
        }

        if (result.data.length) {
            result.success = true;
            if(this.#unlisted_fuel_stops.length){
                globalEmitter.emit('insert:unlisted_fuel_stops', this.#unlisted_fuel_stops);
            }
        } else {
            result.message = "no results found";
        }

        return result;
    }
}

module.exports = SearchUseCase;