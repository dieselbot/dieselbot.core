const FuelStopAPI = require('../infrastructure/fuelstop.api.js');

const _fuelStopAPI = new FuelStopAPI();

class FuelStopService {
    async post(fuelStops){
        return await _fuelStopAPI.post(fuelStops)
    }
}

module.exports = FuelStopService