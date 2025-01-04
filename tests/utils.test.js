const { chop_left } = require("../common/utils");

describe('chop_left string utility', () => {
    
    String.prototype.chop_left = chop_left;

    it('should drop all characters following the input character', () => {
        const string_value = "123/456";
        const input_character = "/";

        const result = string_value.chop_left(input_character);

        expect(result).toEqual("123");
    })

    it('should return empty string when the string value is empty', () => {
        const string_value = "";
        const input_character = "/";

        const result = string_value.chop_left(input_character);

        expect(result).toEqual("");
    })

    it('should return original string value when the input character is an empty string', () => {
        const original_string_value = "abc/def";
        const input_character = '';

        const result = original_string_value.chop_left(input_character);

        expect(result).toBe(original_string_value);
    })

    it('should return original string value when the input character is null', () => {
        const original_string_value = "abc/def";
        const input_character = null;

        const result = original_string_value.chop_left(input_character);

        expect(result).toBe(original_string_value);
    })

    it('should return original string value when the input character is undefined', () => {
        const original_string_value = "abc/def";

        const result = original_string_value.chop_left();

        expect(result).toBe(original_string_value);
    })
})