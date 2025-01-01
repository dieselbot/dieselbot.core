const FuelStopAPI = require('../infrastructure/fuelstop.api.js');

class FuelStopService {
    constructor() {
        this._api = new FuelStopAPI();
    }
    async post(fuelStops){
        return await this._api.post(fuelStops)
    }
}

module.exports = FuelStopService