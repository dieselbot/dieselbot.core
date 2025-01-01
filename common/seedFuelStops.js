const FuelStopDB = require("../infrastructure/fuelstop.db");
const { FUELSTOPS } = require('./constants.json');

async function seedFuelStops() {

    const fuelStopDb = new FuelStopDB();

    const docRef = fuelStopDb._db.collection(FUELSTOPS);

    await docRef.add({
        display_name: 'Melton Truck Lines Inc',
        address: '808 N 161st E Ave, Tulsa, OK 74116',
        city: 'TULSA',
        state: 'OK',
        highway: 'I-44',
        exit: '238'
    })

    await docRef.add({
        display_name: 'Melton Truck Lines Inc. -Laredo Terminal',
        address: '8720, 8618 Las Cruces Dr, Laredo, TX 78045',
        city: 'LAREDO',
        state: 'TX',
        highway: 'I-35',
        exit: '7'
    })

    console.log('successfully seeded fuel stops database!');
    
}

module.exports = seedFuelStops;