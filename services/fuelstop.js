const FuelStopAPI = require('../infrastructure/fuelstop.api.js');

class FuelStopService {
    
    #_fuelStopAPI;

    constructor(fuelStopAPI = new FuelStopAPI()) {
        this.#_fuelStopAPI = fuelStopAPI;
    }
    post(fuelStops){
        return this.#_fuelStopAPI.post(fuelStops)
    }
}

module.exports = FuelStopService