const FuelStop = require('./fuel.stop.js');
const { read_lines } = require('../common/utils.js');
const regex = require('../common/regex.js');
const { FuelSolutionError } = require('../common/errors.js');
const { Line1Validator, Line2Validator } = require('../common/validators.js')
const { fuel_solution } = require("../common/constants.json")

class FuelSolution {
    constructor(fuel_solution_text) {
        this.text = fuel_solution_text;
        this.fuel_stops = new Map();
        this.lines = null;
    }

    #_validate() {
        const invalid_fuel_solution = new Error('invalid fuel solution');
        if (!/\n/.test(this.text) || this.text.length > fuel_solution.max_length) throw invalid_fuel_solution;

        const errors = [];
        this.lines = read_lines(this.text).filter(line => {
            return !regex.skip_line.test(line.collapse());
        })

        if (this.lines.length < 2 ||
            this.lines.every(line => !regex.line_1.test(line) && !regex.line_2.test(line)))
            throw invalid_fuel_solution;

        if (!Number.isInteger(this.lines.length / 2)) throw new FuelSolutionError();

        const line1Validator = new Line1Validator();
        const line2Validator = new Line2Validator();
        let validator = line1Validator;

        this.lines.forEach((line, index) => {
            try {
                validator.validate(line);
            } catch (error) {
                errors.push(error.message);
            }
            validator = Number.isInteger(index / 2) ? line2Validator : line1Validator;
        });

        if (errors.length) {
            throw new FuelSolutionError("Please review your fuel solution.", { errors });
        }
    }

    read() {
        this.#_validate();
        for (let index = 0; index < this.lines.length; index += 2) {
            const line = this.lines[index];
            const fuelStop = new FuelStop(line, this.lines[index + 1]);
            fuelStop.read();
            this.fuel_stops.set(fuelStop.id, fuelStop);
        }
    }
}

module.exports = FuelSolution;