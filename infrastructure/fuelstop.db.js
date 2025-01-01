const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

initializeApp({
  credential: cert(serviceAccount)
});

class FuelStopDB {
    constructor() {
        this.firestore = getFirestore()
    }
}

module.exports = FuelStopDB;
