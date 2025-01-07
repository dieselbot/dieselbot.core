const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

let serviceAccount = null;
const google_application_credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

try {
  serviceAccount = require(google_application_credentials);
  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.warn(`failed to init Firebase: check config file: ${google_application_credentials}`);
  console.warn(error.message);
}

class FuelStopDB {
  constructor(firestore = serviceAccount && getFirestore()) {
    this.firestore = firestore;
  }
}

module.exports = FuelStopDB;
