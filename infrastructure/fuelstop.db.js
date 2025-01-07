const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

let serviceAccount = null;

try {
  serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.warn(`failed to init Firebase: `, error);
}

class FuelStopDB {
  constructor(firestore = serviceAccount && getFirestore()) {
    this.firestore = firestore;
  }
}

module.exports = FuelStopDB;
