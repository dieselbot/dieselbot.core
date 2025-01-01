const FuelStopAPI = require('../infrastructure/fuelstop.api.js');

const _api = new FuelStopAPI();

class FuelStopService {
    async post(fuelStops){
        return await _api.post(fuelStops)
    }
}

module.exports = FuelStopService