const FuelStop = require("./fuel.stop");

describe('fuel stop', () => {
    it('should error when line 1 is not defined', () => {
        const line_1 = undefined;
        const line_2 = "x";
        expect(() => {
            new FuelStop(line_1, line_2);
        }).toThrow('missing line 1')
    })
    it('should error when line 2 is not defined', () => {
        const line_1 = "x";
        const line_2 = undefined;
        expect(() => {
            new FuelStop(line_1, line_2);
        }).toThrow('missing line 2')
    })
    it('should set city name', () => {
        const fuelStop = new FuelStop('x','y');

        fuelStop.city = "a/b";

        expect(fuelStop.city).toBe('a');
    })
})