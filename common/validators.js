const { code } = require('./constants.json');
const { is_empty } = require('./utils');

class Validator {
    constructor(handlers = []) {
        this.handlers = handlers;
    }
    addHandler(handler){
        this.handlers.push(handler);
    }
    validate(input){
        for (const handler of this.handlers) {
            if(!handler(input)) return false;
        }
        return true;
    }
}

class FuelStopValidator extends Validator {
    constructor(){
        super([
            (fuelStop) => !is_empty(fuelStop),
            (fuelStop) => code.includes(fuelStop.code),
            (fuelStop) => !is_empty(fuelStop.display_name),
            (fuelStop) => !is_empty(fuelStop.address),
            (fuelStop) => !is_empty(fuelStop.city),
            (fuelStop) => (!is_empty(fuelStop.state) && fuelStop.state.length == 2
                           && (new RegExp(`${fuelStop.state}.*\\d+`, 'g')).test(fuelStop.address))
        ])
    }
}

module.exports = {
    Validator,
    FuelStopValidator
}