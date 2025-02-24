const { Validator, FuelStopValidator, Line1Validator, Line2Validator } = require("./validators");
const { get_fuel_stop } = require('../test/helpers');

describe('validator', () => {
    let validator;

    beforeEach(() => {
        validator = new Validator();
    })

    it('adds new handlers', () => {
        validator.addHandler(() => true);

        expect(validator.handlers.length).toBe(1);
    })
    it('returns true when all handlers return true', () => {
        validator.addHandler(() => true);

        expect(validator.validate()).toBe(true);
    })
    it('returns false when any handler returns false', () => {
        validator.addHandler(() => true);
        validator.addHandler(() => true);
        validator.addHandler(() => false);

        expect(validator.validate()).toBe(false);
    })
})

describe('fuel stop validator', () => {
    let fuel_stop_validator;

    beforeEach(() => {
        fuel_stop_validator = new FuelStopValidator();
    })

    it('fails when fuel stop is null', () => {
        const fuel_stop = null;

        const result = fuel_stop_validator.validate(fuel_stop);

        expect(result).toBe(false);
    })
    it('fails when fuel stop is empty object', () => {
        const fuel_stop = {};

        const result = fuel_stop_validator.validate(fuel_stop);

        expect(result).toBe(false);
    })
    it('fails when fuel stop code is null', () => {
        const fuel_stop = get_fuel_stop();
              fuel_stop.code = null;

        const result = fuel_stop_validator.validate(fuel_stop);

        expect(result).toBe(false);
    })
    it('fails when fuel stop address is null', () => {
        const fuel_stop = get_fuel_stop();
              fuel_stop.address = null;

        const result = fuel_stop_validator.validate(fuel_stop);

        expect(result).toBe(false);
    })
    it('fails when fuel stop city is null', () => {
        const fuel_stop = get_fuel_stop();
              fuel_stop.city = null;

        const result = fuel_stop_validator.validate(fuel_stop);

        expect(result).toBe(false);
    })
    it('fails when fuel stop state is null', () => {
        const fuel_stop = get_fuel_stop();
              fuel_stop.state = null;

        const result = fuel_stop_validator.validate(fuel_stop);

        expect(result).toBe(false);
    })
    it('fails when fuel stop state does not appear in address', () => {
        const fuel_stop = get_fuel_stop();
              fuel_stop.address = '0000 N Test Rd, TestCity, XX 00000'
              fuel_stop.state = 'YY';

        const result = fuel_stop_validator.validate(fuel_stop);

        expect(result).toBe(false);
    })
    it('fails when fuel stop address has no zip code', () => {
        const fuel_stop = get_fuel_stop();
              fuel_stop.address = '0000 N Test Rd, TestCity, XX'

        const result = fuel_stop_validator.validate(fuel_stop);

        expect(result).toBe(false);
    })
    it('passes when fuel stop code is recognized', () => {
        const fuel_stop = get_fuel_stop();
              fuel_stop.code = 'pilot';

        const result = fuel_stop_validator.validate(fuel_stop);

        expect(result).toBe(true);
    })
})

describe('line 1 validator', () => {
    const validator = new Line1Validator();

    it('should error when line 1 is empty', () => {
        const line_1_text = undefined;
        expect(() => {
            validator.validate(line_1_text)
        }).toThrow('missing line 1');
    })

    it('should error when highway is missing', () => {
        const line_1_text = 'LOVES COUNTRY';
        expect(() => {
            validator.validate(line_1_text)
        }).toThrow(`missing highway: "${line_1_text}"`);
    })

    it('should error when highway prefix is missing', () => {
        const line_1_text = 'LOVES COUNTRY 20';
        expect(() => {
            validator.validate(line_1_text)
        }).toThrow(`missing highway: "${line_1_text}"`);
    })

    it('should error when highway number is missing', () => {
        const line_1_text = 'LOVES COUNTRY I';
        expect(() => {
            validator.validate(line_1_text)
        }).toThrow(`missing highway: "${line_1_text}"`);
    })

    it('should error when name is missing', () => {
        const line_1_text = 'I 20';
        expect(() => {
            validator.validate(line_1_text)
        }).toThrow(`missing name: "${line_1_text}"`);
    })

    it('should return true when name and highway are present', () => {
        const line_1_text = 'LOVES COUNTRY I 20';
        const result = validator.validate(line_1_text);
        expect(result).toBe(true);
    })
    
})

describe('line 2 validator', () => {
    const validator = new Line2Validator();
    it('should error when line 2 is empty', () => {
        const line_2_text = undefined;
        expect(() => {
            validator.validate(line_2_text)
        }).toThrow('missing line 2');
    })
    it('should error when city is missing', () => {
        const line_2_text = 'CT';
        expect(() => {
            validator.validate(line_2_text)
        }).toThrow(`missing city: "${line_2_text}"`);
    })
    it('should error when state is missing', () => {
        const line_2_text = 'WILLINGTON';
        expect(() => {
            validator.validate(line_2_text)
        }).toThrow(`missing state: "${line_2_text}"`);
    })
    it('should return true when city and state are present', () => {
        const line_2_text = 'WILLINGTON CT';
        const result = validator.validate(line_2_text);
        expect(result).toBe(true);
    })
})