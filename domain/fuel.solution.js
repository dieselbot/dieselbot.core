const FuelStop = require('./fuel.stop.js');
const { FuelSolutionError } = require('../common/errors.js');
const { LineValidator, 
        FuelSolutionValidator } = require('../common/validators.js');

class FuelSolution {
    constructor(fuel_solution_text) {
        this.text = fuel_solution_text;
        this.fuel_stops = new Map();
        this.lines = null;
    }

    #_validate() {
        const fs_validator = new FuelSolutionValidator();

        try {
            fs_validator.validate(this.text);
            this.lines = fs_validator.text_lines;
        } catch (error) {
            throw new FuelSolutionError({ errors: [error.message] });
        }
        
        const lineValidator = new LineValidator();
        const errors = [];
        
        this.lines.forEach(line => {
            try {
                lineValidator.validate(line);
            } catch (error) {
                errors.push(error.message);
            }
            lineValidator.toggle();
        });

        if (errors.length) {
            throw new FuelSolutionError({ errors });
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