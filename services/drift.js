const DriftAPI = require("../infrastructure/drift.api");
const { search_results } = require('../templates/index.js');

class DriftService {

    #_driftAPI;

    constructor(driftAPI = new DriftAPI()) {
        this.#_driftAPI = driftAPI
    }
    send(conversation_id, fuel_stops) {
        const message = search_results({ fuel_stops });
        return this.write(conversation_id, message);
    }
    write(conversation_id, message) {
        return this.#_driftAPI.send(conversation_id, message);
    }
}

module.exports = DriftService;