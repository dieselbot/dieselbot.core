const { chop_left, is_empty, read_lines, check_env } = require("./utils");

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

describe('check_env function', () => {
    const fs = require('fs');
    const path = require('path');

    it('should use default file path when file path argument is undefined', () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        console.warn = jest.fn();
        const default_file_path = path.join(__dirname, '../.env');
        const input_file_path = undefined;

        check_env(input_file_path);

        expect(fs.existsSync).toHaveBeenCalledWith(default_file_path);
    })
    it('should use input file path when input file path is defined', () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        console.warn = jest.fn();
        const input_file_path = 'x';

        check_env(input_file_path);

        expect(fs.existsSync).toHaveBeenCalledWith(input_file_path);
    })
    it('should warn when the file path does not exist', () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        jest.spyOn(console, 'warn');

        check_env();

        expect(console.warn).toHaveBeenCalled();
    })
    it('should warn when there is an error reading the file path', () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => callback(true));

        check_env();

        expect(console.warn).toHaveBeenCalled();
    })
    it('should warn when environment variable is undefined', () => {
        const env_variable = 'x';
        const file_data = `${env_variable}=`;
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => callback(false, file_data));
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.replaceProperty(process, 'env', { [env_variable]: undefined })
        jest.spyOn(console, 'warn');

        check_env();

        expect(console.warn).toHaveBeenCalled();
    })
})