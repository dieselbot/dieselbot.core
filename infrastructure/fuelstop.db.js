const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

initializeApp({
  credential: cert(serviceAccount)
});

class FuelStopDB {
    constructor() {
        this._db = getFirestore()
    }
}

module.exports = FuelStopDB;
