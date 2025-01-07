const FuelStop = require('./fuel.stop.js');

class FuelSolution {
    constructor(fuel_solution_text) {
        this.text = fuel_solution_text;
        this.fuel_stops = new Map();
        this.lines = null;
    }
    read_lines() {
        this.lines = this.text.trim().split('\n')
            .map(part => part.trim())
            .filter(part => part.length > 1);
    }
    read() {
        this.read_lines();
        this.lines.forEach((line, i) => {
            if (/QTY:\s[A-Z|\d]+/.test(line)) {
                const fuelStop = new FuelStop(line, this.lines[i + 1]);
                fuelStop.read();
                this.fuel_stops.set(i, fuelStop);
            }
        })
    }
}

module.exports = FuelSolution;