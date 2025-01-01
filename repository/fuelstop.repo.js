const FuelStopDB = require("../infrastructure/fuelstop.db");

const _db = new FuelStopDB();

class FuelStopRepo {
    constructor() {
        this.fuelstops_collection = _db.firestore.collection("fuelstops");
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
            console.log('no matching fuel stops.');
            return;
        }

        if (snapshot.size > 1) {
            console.log('more than one fuel stop found.');
            return;
        }

        return snapshot.docs.at(0).data();
    }

    async addOne(fuelstop) {

        const { city, state, highway, exit } = fuelstop;

        if (!city || !state || !highway || !exit) {
            console.log('abort insert - fuel stop has missing fields');
            return;
        }

        const docRef = await this.fuelstops_collection.add(fuelstop);

        return docRef.id;

    }
}

module.exports = FuelStopRepo;
