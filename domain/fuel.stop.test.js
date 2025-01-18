const FuelStop = require("./fuel.stop");

describe('constructor', () => {
    test.each([
        ['line 1', undefined, 'x'],
        ['line 2', "x", undefined]
    ])('should error when %s is not defined', (line, line_1, line_2) => {
        expect(() => {
            new FuelStop(line_1, line_2);
        }).toThrow(`missing ${line}`)
    })
})

describe('members', () => {
    
    const fuelStop = new FuelStop('x','y');

    it('should set name', () => {
        fuelStop.name = "a";

        expect(fuelStop.name).toBe('a');
    })
    it('should set city', () => {
        fuelStop.city = "a";

        expect(fuelStop.city).toBe('a');
    })
    it('should drop slash and following characters from name', () => {
        fuelStop.name = "a/b";

        expect(fuelStop.name).toBe('a');
    })
    it('should drop slash and following characters from city', () => {
        fuelStop.city = "a/b";

        expect(fuelStop.city).toBe('a');
    })
    test.each([
        ['love', "Love's"],
        ['pilot', "Pilot"],
        ['flying', "Flying J"],
        ['petro', "PETRO"],
        ['melton', "LAREDO TERMINAL"],
        ['melton', "TULSA TERMINAL"]
    ])('should set "%s" code', (code, name) => {
        
        fuelStop.name = name;

        expect(fuelStop.code).toBe(code);
    })
    it('should set null code for unsupported name', () => {
        fuelStop.name = "x";
        expect(fuelStop.code).toBeNull();
    })
})

describe('methods', () => {
    const fuelStop = new FuelStop('x','y');
    it('should read lines 1 and 2', () => {
        fuelStop.read_line_1 = jest.fn();
        fuelStop.read_line_2 = jest.fn();
        
        fuelStop.read();

        expect(fuelStop.read_line_1).toHaveBeenCalled();
        expect(fuelStop.read_line_2).toHaveBeenCalled();
    })
})