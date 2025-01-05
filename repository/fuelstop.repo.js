const FuelStop = require("../domain/fuel.stop");
const FuelStopDB = require("../infrastructure/fuelstop.db");

class FuelStopRepo {
    
    #_fuelStopDB;

    constructor(fuelStopDB = new FuelStopDB()) {
        this.#_fuelStopDB = fuelStopDB;
        this.fuelstops_collection = this.#_fuelStopDB.firestore.collection("fuelstops");
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

        const {code, display_name, city, state, highway } = fuelstop;
        
        if (!code || !display_name || !city || !state || !highway) {
            throw new Error(`abort insert - invalid fuel stop: ${JSON.stringify(fuelstop)}`);
        }

        const docRef = await this.fuelstops_collection.add(fuelstop);

        return docRef.id;

    }
}

module.exports = FuelStopRepo;
