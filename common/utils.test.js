const { chop_left, is_empty } = require("./utils");

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
})