const DriftAPI = require("../infrastructure/drift.api");

class DriftService {

    #_driftAPI;

    constructor(driftAPI = new DriftAPI()) {
        this.#_driftAPI = driftAPI
    }
    send(conversation_id, fuelstops) {
        let message = ``;
        for (const fuelstop of fuelstops) {
            message = message.concat(`<p>${fuelstop.display_name}<br/>${fuelstop.address}</p><br/><br/>`)
        }
        message = message.substring(0, message.lastIndexOf('<br/><br/>'))
        return this.#_driftAPI.send(conversation_id, message)
    }
}

module.exports = DriftService;