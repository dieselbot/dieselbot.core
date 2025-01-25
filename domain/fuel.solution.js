const FuelStop = require('./fuel.stop.js');
const { read_lines } = require('../common/utils.js');
const regex = require('../common/regex.js');
const FuelSolutionError = require('../common/fuel.solution.error.js');

class FuelSolution {
    constructor(fuel_solution_text) {
        this.text = fuel_solution_text;
        this.fuel_stops = new Map();
    }

    read() {
        const errors = [];
        const lines = read_lines(this.text).filter(line => (
            regex.line_1.test(line) || regex.line_2.test(line)
        ));
        if (!Number.isInteger(lines.length / 2)) throw new FuelSolutionError();
        lines.forEach((line, i) => {
            if (Number.isInteger(i / 2)) {
                const fuelStop = new FuelStop(line, lines[i + 1]);
                try {
                    fuelStop.read();
                    this.fuel_stops.set(fuelStop.id, fuelStop);
                } catch (error) {
                    errors.push(error.message);
                }
            }
        })
        if (errors.length) {
            throw  new FuelSolutionError("invalid fuel solution", { errors });
        }
    }
}

module.exports = FuelSolution;