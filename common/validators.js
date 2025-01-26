const { code } = require('./constants.json');
const regex = require('../common/regex');
const { is_empty, collapse } = require('./utils');

class Validator {
    constructor(handlers = []) {
        this.handlers = handlers;
    }
    addHandler(handler) {
        this.handlers.push(handler);
    }
    validate(input) {
        for (const handler of this.handlers) {
            if (!handler(input)) return false;
        }
        return true;
    }
}

class FuelStopValidator extends Validator {
    constructor() {
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

class Line1Validator extends Validator {
    constructor() {
        super([
            (line_1) => {
                if (is_empty(line_1))
                    throw new Error('missing line 1');
                return true;
            },
            (line_1) => {
                const result = regex.line_1.exec(line_1);
                if (!result) {
                    throw new Error(`missing highway: "${line_1}"`);
                } else if (result.index == 0) {
                    throw new Error(`missing name: "${line_1}"`);
                }
                return true;
            }
        ])
    }
}

String.prototype.collapse = collapse;

class Line2Validator extends Validator {
    constructor() {
        super([
            (line_2) => {
                if (is_empty(line_2))
                    throw new Error('missing line 2');
                return true;
            },
            (line_2) => {
                const result = regex.exit.exec(line_2);
                let city_state = line_2.collapse();
                if (result) {
                    if (result.index == 0) {
                        throw new Error(`missing city and state: "${line_2}"`);
                    }
                    city_state = line_2.substring(0, result.index).trim();
                }

                const midpoint = city_state.lastIndexOf(' ');
                const city = city_state.substring(0, midpoint).trim();
                const state = city_state.substring(midpoint).trim();

                if (!regex.state.test(state)) throw new Error(`missing state: "${line_2}"`);
                if (!city) throw new Error(`missing city: "${line_2}"`);

                return true;
            }
        ])
    }
}

module.exports = {
    Validator,
    FuelStopValidator,
    Line1Validator,
    Line2Validator
}