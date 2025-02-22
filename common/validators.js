const { code, fuel_solution } = require('./constants.json');
const { is_empty, collapse, read_lines } = require('./utils');
const regex = require('../common/regex');

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

String.prototype.collapse = collapse;

class FuelSolutionValidator extends Validator {
    constructor() {
        const default_error = new Error('invalid fuel solution');
        super([
            (text) => {
                if (!text.trim()) throw new Error('missing fuel solution text')
                if (!/\n/.test(text)) {
                    throw default_error;
                }
                return true;
            },
            (text) => {
                const maxlen = fuel_solution.max_length;
                if (text.length > maxlen) {
                    throw new Error(`fuel solution text must be less than ${maxlen} characters`);
                }
                return true;
            },
            (text) => {
                const lines = read_lines(text).filter(line => {
                    return !regex.skip_line.test(line.collapse());
                })
                if (!Number.isInteger(lines.length / 2) ||
                    lines.every(line => !regex.line_1.test(line) && !regex.line_2.test(line))) {
                    throw default_error;
                }
                this.text_lines = lines;
                return true;
            }
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

class LineValidator {
    constructor() {
        this.line1Validator = new Line1Validator();
        this.line2Validator = new Line2Validator();
        this.validator = this.line1Validator;
    }
    toggle() {
        this.validator = (
            this.validator instanceof Line1Validator
                ? this.line2Validator : this.line1Validator
        )
    }
    validate(line_text) {
        this.validator.validate(line_text)
    }
}

module.exports = {
    Validator,
    FuelSolutionValidator,
    FuelStopValidator,
    LineValidator,
    Line1Validator,
    Line2Validator
}