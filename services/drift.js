const DriftAPI = require("../infrastructure/drift.api");

class DriftService {

    #_driftAPI;

    constructor(driftAPI = new DriftAPI()) {
        this.#_driftAPI = driftAPI
    }
    send(conversation_id, fuelstops) {
        let message = ``;
        for (const fuelstop of fuelstops) {
            message = message.concat(`<p><b>${fuelstop.display_name}</b><br/>${fuelstop.address}</p><br/>`)
        }
        message = message.substring(0, message.lastIndexOf('<br/>'))
        return this.#_driftAPI.send(conversation_id, message);
    }
    write(conversation_id, message) {
        return this.#_driftAPI.send(conversation_id, message);
    }
}

module.exports = DriftService;