const { FuelStopValidator } = require("../common/validators");
const FuelStopDB = require("../infrastructure/fuelstop.db");

class FuelStopRepo {

    #_fuelStopDB;

    constructor(
        fuelStopDB = new FuelStopDB(),
        fuelStopValidator = new FuelStopValidator()
    ) {
        this.#_fuelStopDB = fuelStopDB;
        this.fuelstops_collection = this.#_fuelStopDB.firestore && this.#_fuelStopDB.firestore.collection("fuelstops");
        this.fuelStopValidator = fuelStopValidator;
    }
    async findOne(fuelstop) {

        const { code, city, state, highway, exit } = fuelstop;
        const snapshot = await this.fuelstops_collection
            .where("exit", "==", exit)
            .where("highway", "==", highway)
            .where("city", "==", city)
            .where("state", "==", state)
            .where("code", "==", code)
            .orderBy('exit')
            .orderBy('highway')
            .get();

        if (snapshot.empty) {
            console.warn('no matching fuel stops.');
            return;
        }

        if (snapshot.size > 1) {
            console.warn('more than one fuel stop found.');
            return;
        }

        return snapshot.docs[0].data();
    }

    async addOne(fuelstop) {
        if (!this.fuelStopValidator.validate(fuelstop)) {
            throw new Error(`fuel stop validation failed: ${JSON.stringify(fuelstop)}`)
        }
        return await this.fuelstops_collection.add(fuelstop);
    }

    async addMany(fuelstops) {
        for (const fuelstop of fuelstops) {
            if (!this.fuelStopValidator.validate(fuelstop)) {
                throw new Error(`fuel stop validation failed: ${JSON.stringify(fuelstop)}`)
            }
        }
        return Promise.all(fuelstops.map((fuelstop) => {
            return this.fuelstops_collection.add(fuelstop);
        }))
    }
}

module.exports = FuelStopRepo;
