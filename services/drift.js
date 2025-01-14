const DriftAPI = require("../infrastructure/drift.api");

class DriftService {

    #_driftAPI;

    constructor(driftAPI = new DriftAPI()) {
        this.#_driftAPI = driftAPI
    }
    send(conversation_id, fuelstops) {
        let message = ``;
        for (const fuelstop of fuelstops) {
            message = message.concat(`${fuelstop.display_name}\n${fuelstop.address}\n\n`)
        }
        return this.#_driftAPI.send(conversation_id, message)
    }
}

module.exports = DriftService;