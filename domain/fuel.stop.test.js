const FuelStop = require("./fuel.stop");

describe('constructor', () => {
    test.each([
        ['line 1', undefined, 'x'],
        ['line 2', "x", undefined]
    ])('should error if %s is not defined', (line, line_1, line_2) => {
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
    it('should set default code for unrecognized name', () => {
        fuelStop.name = "x";
        expect(fuelStop.code).toBe("other");
    })
})

describe('methods', () => {
    it('should read lines 1 and 2', () => {
        const fuelStop = new FuelStop('x','y');
        fuelStop.read_line_1 = jest.fn();
        fuelStop.read_line_2 = jest.fn();
        
        fuelStop.read();

        expect(fuelStop.read_line_1).toHaveBeenCalled();
        expect(fuelStop.read_line_2).toHaveBeenCalled();
    })
    it('should read name and highway from line 1', () => {
        const fuelStop = new FuelStop('PILOT TRAVEL CE I 80 QTY: FILL','y');
        
        fuelStop.read_line_1();

        expect(fuelStop.name).toBe('PILOT TRAVEL');
        expect(fuelStop.highway).toBe('I-80');
    })
    it('should read city and state from line 2', () => {
        const fuelStop = new FuelStop('x', 'GRAND ISLAND NE EX: 312');
        
        fuelStop.read_line_2();

        expect(fuelStop.city).toBe('GRAND ISLAND');
        expect(fuelStop.state).toBe('NE');
    })
    test('read method: should set search_phrase', () => {
        const fuelStop = new FuelStop(
            'PILOT TRAVEL CE I 80 QTY: FILL',
            'GRAND ISLAND NE EX: 312');
        
        expect(fuelStop.search_phrase).toBe('');
        
        fuelStop.read();

        expect(fuelStop.search_phrase)
            .toBe(`${fuelStop.name} ${fuelStop.city} ${fuelStop.state} ${fuelStop.highway}`);
    })
})