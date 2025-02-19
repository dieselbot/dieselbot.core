const { FuelStopValidator } = require("../common/validators");
const FuelStopDB = require("../infrastructure/fuelstop.db");

class FuelStopRepo {

    #_fuelStopDB;

    constructor(
        fuelStopDB = new FuelStopDB(),
        fuelStopValidator = new FuelStopValidator()
    ) {
        this.#_fuelStopDB = fuelStopDB;
        this.fuelStopValidator = fuelStopValidator;
    }

    async findOne(fuelstopId) {
        return this.#_fuelStopDB.getById(fuelstopId);
    }

    async findMany(...ids) {
        return this.#_fuelStopDB.getByIds(ids);
    }

    addMany(fuelstops) {
        for (const fuelstop of fuelstops) {
            if (!this.fuelStopValidator.validate(fuelstop)) {
                return Promise.reject(`fuel stop validation failed: ${JSON.stringify(fuelstop)}`)
            }
        }
        return this.#_fuelStopDB.batchWrite(fuelstops);
    }
}

module.exports = FuelStopRepo;
