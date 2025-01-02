const GooglePlacesService = require('../services/google.places');
const FuelStopRepo = require('../repository/fuelstop.repo');
const FuelStop = require('../domain/fuel.stop');

class SearchUseCase {
    constructor() {
        this.fuel_solution = null;
        this.places_service = new GooglePlacesService();
        this.fuel_stop_repo = new FuelStopRepo();
        this.missing_fuel_stops = [];
    }
    async execute() {
        this.fuel_solution.read();
        const fuelStops = this.fuel_solution.fuel_stops;
        const results = [];

        for (const id in fuelStops) {
            const fuelStop = fuelStops[id];

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