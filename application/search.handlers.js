const FuelStopRepo = require('../repository/fuelstop.repo');
const GooglePlacesService = require('../services/google.places');

class SearchHandler {
    #nextHandler;
    setNextHandler(handler){
        this.#nextHandler = handler;
    }
    async handle(context){
        if(this.#nextHandler){
           await this.#nextHandler.handle(context);
        }
    }
}

class RepoSearchHandler extends SearchHandler {
    constructor(fuel_stop_repo = new FuelStopRepo()) {
        super();
        this.fuel_stop_repo = fuel_stop_repo;
    }
    async handle(context){
        const fuel_stop_ids = Array.from(context.fuel_stops.keys());
        const fuel_stops = await this.fuel_stop_repo.findMany(...fuel_stop_ids);
        fuel_stops.forEach((_,id) => context.fuel_stops.delete(id));
        context.found = Array.from(fuel_stops.values());
        await super.handle(context);
    }
}

class PlaceSearchHandler extends SearchHandler {
    constructor(places_service = new GooglePlacesService()) {
        super();
        this.places_service = places_service;
    }
    async handle(context){
        if(context.fuel_stops.size == 0) return await super.handle(context);
        for (const [id,fuel_stop] of context.fuel_stops) {
            const unlisted_fuel_stop = await this.places_service.findPlace(fuel_stop);
            if(unlisted_fuel_stop){
                context.unlisted.push(unlisted_fuel_stop);
                context.fuel_stops.delete(id);
            }
        }
        if(context.fuel_stops.size > 0){
            context.not_found = Array.from(context.fuel_stops.values());
        }
        await super.handle(context);
    }
}

module.exports = {
    RepoSearchHandler,
    PlaceSearchHandler
}