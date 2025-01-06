const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const google_app_creds_path = process.env.GOOGLE_APPLICATION_CREDENTIALS;

let serviceAccount = null;

if(google_app_creds_path){
  serviceAccount = require(google_app_creds_path);
  initializeApp({
    credential: cert(serviceAccount)
  });
}

class FuelStopDB {
    constructor(firestore = serviceAccount && getFirestore()) {
        this.firestore = firestore;
    }
}

module.exports = FuelStopDB;
