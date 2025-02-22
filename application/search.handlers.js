const FuelStopRepo = require('../repository/fuelstop.repo');
const GooglePlacesService = require('../services/google.places');
const { FuelStopValidator } = require('../common/validators');

class SearchHandler {
    #nextHandler;
    setNextHandler(handler) {
        this.#nextHandler = handler;
    }
    async handle(context) {
        if (this.#nextHandler) {
            await this.#nextHandler.handle(context);
        }
    }
}

class RepoSearchHandler extends SearchHandler {
    constructor(fuel_stop_repo = new FuelStopRepo()) {
        super();
        this.fuel_stop_repo = fuel_stop_repo;
    }
    async handle(context) {
        const fuel_stop_ids = Array.from(context.fuel_stops.keys());
        context.found = new Map(fuel_stop_ids.map(id => [id, null]));
        const fuel_stops = await this.fuel_stop_repo.findMany(...fuel_stop_ids);
        fuel_stops.forEach((fuel_stop, id) => {
            context.found.set(id, fuel_stop);
            context.fuel_stops.delete(id);
        })
        await super.handle(context);
    }
}

class PlaceSearchHandler extends SearchHandler {
    constructor(places_service = new GooglePlacesService()) {
        super();
        this.places_service = places_service;
        this.fuelStopValidator = new FuelStopValidator();
    }
    async handle(context) {
        if (context.fuel_stops.size == 0) return await super.handle(context);
        for (const [id, fuel_stop] of context.fuel_stops) {
            const unlisted_fuel_stop = await this.places_service.findPlace(fuel_stop);
            if (this.fuelStopValidator.validate(unlisted_fuel_stop)) {
                context.found.set(id, unlisted_fuel_stop);
                context.unlisted.push(unlisted_fuel_stop);
                context.fuel_stops.delete(id);
            }
        }
        if (context.fuel_stops.size > 0) {
            context.not_found = Array.from(context.fuel_stops.values());
            context.not_found.forEach(fuel_stop => { 
                context.found.delete(fuel_stop.id) 
            });
        }
        await super.handle(context);
    }
}

module.exports = {
    RepoSearchHandler,
    PlaceSearchHandler
}