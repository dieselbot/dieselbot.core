const { 
    chop_left, is_empty, read_lines, hash,
    collapse, trimAll, get_fuel_stop_id
 } = require("./utils");

const { get_fuel_stop } = require('../test/helpers');

describe('chop_left string utility', () => {

    String.prototype.chop_left = chop_left;

    it('should drop all characters following the input character', () => {
        const string_value = "a/b";
        const input_character = "/";

        const result = string_value.chop_left(input_character);

        expect(result).toEqual("a");
    })

    it('should return empty string when the string value is empty', () => {
        const string_value = "";
        const input_character = "/";

        const result = string_value.chop_left(input_character);

        expect(result).toEqual("");
    })

    it('should return original string value when the input character is an empty string', () => {
        const original_string_value = "a";
        const input_character = '';

        const result = original_string_value.chop_left(input_character);

        expect(result).toBe(original_string_value);
    })

    it('should return original string value when the input character is null', () => {
        const original_string_value = "a";
        const input_character = null;

        const result = original_string_value.chop_left(input_character);

        expect(result).toBe(original_string_value);
    })

    it('should return original string value when the input character is undefined', () => {
        const original_string_value = "a";

        const result = original_string_value.chop_left();

        expect(result).toBe(original_string_value);
    })
})

describe('is_empty function', () => {
    it('returns true for null', () => {
        const input_value = null;
        const result = is_empty(input_value);
        expect(result).toBe(true);
    })
    it('returns true for undefined', () => {
        const result = is_empty();
        expect(result).toBe(true);
    })
    it('returns true for empty object', () => {
        const input_value = {};
        const result = is_empty(input_value);
        expect(result).toBe(true);
    })
    it('returns true for empty string', () => {
        const input_value = '';
        const result = is_empty(input_value);
        expect(result).toBe(true);
    })
    it('returns true for 0', () => {
        const input_value = 0;
        const result = is_empty(input_value);
        expect(result).toBe(true);
    })
    it('returns false for false', () => {
        const input_value = false;
        const result = is_empty(input_value);
        expect(result).toBe(false);
    })
    it('returns false for non-null value', () => {
        const input_value = "x";
        const result = is_empty(input_value);
        expect(result).toBe(false);
    })
})

describe('read_lines function', () => {

    const string_value = 'line one \n line two \n line three';

    it('should return an array', () => {
        const lines = read_lines(string_value);
        expect(Array.isArray(lines)).toBe(true);
    })
    it('should divide string by new line character', () => {
        const lines = read_lines(string_value);
        expect(lines.length).toBe(3);
    })
})

describe('hash function', () => {
    
    const string_value = 'test';

    it('should hash string value', () => {    
        const result = hash(string_value);

        expect(result).toBeDefined();
    })

    it('should return same hash for same input', () => {    
        const result_1 = hash(string_value);
        const result_2 = hash(string_value);

        expect(result_1).toEqual(result_2);
    })
})

describe('collapse function', () => {
    it('should replace all spaces with a single space', () => {
        const input_string = 'a      b';
        const result = collapse.call(input_string);
        expect(result).toBe('a b');
    })
    it('should remove leading spaces', () => {
        const input_string = '   a      b';
        const result = collapse.call(input_string);
        expect(result).toBe('a b');
    })
    it('should remove trailing spaces', () => {
        const input_string = 'a      b   ';
        const result = collapse.call(input_string);
        expect(result).toBe('a b');
    })
})

describe('trimAll function', () => {
    it('should remove all spaces', () => {
        const input_string = '    a      b     ';
        const result = trimAll.call(input_string);
        expect(result).toBe('ab');
    })
})

describe('get_fuel_stop_id function', () => {
    it('should form hash from fuel stop object', () => {
        const fuel_stop = get_fuel_stop();

        const hash = get_fuel_stop_id(fuel_stop);

        expect(hash).toBeDefined();
    })
})