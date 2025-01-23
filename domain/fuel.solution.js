const FuelStop = require('./fuel.stop.js');
const { read_lines } = require('../common/utils.js')

class FuelSolution {
    constructor(fuel_solution_text) {
        this.text = fuel_solution_text;
        this.fuel_stops = new Map();
    }
    
    read() {
        const lines = read_lines(this.text);
        lines.forEach((line, i) => {
            if (/QTY:\s[A-Z|\d]+/.test(line)) {
                const fuelStop = new FuelStop(line, lines[i + 1]);
                fuelStop.read();
                this.fuel_stops.set(fuelStop.id, fuelStop);
            }
        })
    }
}

module.exports = FuelSolution;