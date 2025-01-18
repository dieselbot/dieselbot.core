const FuelSolution = require("./fuel.solution");

describe('fuel solution', () => {
    it('should initialize fuel stops collection', () => {
        const fuelSolution = new FuelSolution();

        expect(fuelSolution.fuel_stops).toBeDefined();
        expect(Object
                .getPrototypeOf(fuelSolution.fuel_stops))
                .toBe(Map.prototype);
    })
    it('should set fuel solution text', () => {
        const fuel_solution_text = 't';
        const fuelSolution = new FuelSolution(fuel_solution_text);

        expect(fuelSolution.text).toBe(fuel_solution_text)
    })
    it('should read fuel solution text', () => {
        const fuel_solution_text = `
            PILOT TRAVEL CE I 80 QTY: FILL
            GRAND ISLAND NE EX: 312`;
        const fuelSolution = new FuelSolution(fuel_solution_text);

        fuelSolution.read();

        expect(fuelSolution.fuel_stops.size).toBe(1);
    })
})