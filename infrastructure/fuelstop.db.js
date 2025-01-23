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
  async getById(id){
    const ref = await this.firestore.collection('fuelstops').doc(id)
    const doc = await ref.get();
    return doc.exists ? doc.data() : null;
  }
  async batchWrite(fuelstops){
    const batch = this.firestore.batch();
    for (const [id, fuelstop] of fuelstops) {
      const ref = await this.firestore.collection('fuelstops').doc(id);
      const doc = await ref.get();
      if(!doc.exists){
        batch.set(ref, fuelstop)
      }
    }
    await batch.commit();
  }
}

module.exports = FuelStopDB;
