const FuelStopDB = require("../infrastructure/fuelstop.db");

class FuelStopRepo {
    constructor() {
        this._db = new FuelStopDB()
    }
}

module.exports = FuelStopRepo;
