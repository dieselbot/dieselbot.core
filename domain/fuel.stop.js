const { chop_left, collapse, get_fuel_stop_id } = require("../common/utils");
const regex = require('../common/regex.js');

String.prototype.collapse = collapse;
String.prototype.chop_left = chop_left;

class FuelStop {
    constructor(text_line_1, text_line_2) {
        if (!text_line_1) throw new Error('missing line 1');
        if (!text_line_2) throw new Error('missing line 2');
        this.line_1 = text_line_1.collapse();
        this.line_2 = text_line_2.collapse();
        this.city = '';
        this.state = '';
        this.highway = '';
        this.exit = null;
        this.search_phrase = '';
        this.place_id = '';
    }

    get id() { return get_fuel_stop_id(this); }

    #_city = null;
    #_name = null;

    set city(value) {
        this.#_city = value.chop_left();
    }
    get city() { return this.#_city; }

    set name(value) {
        switch (true) {
            case /LOVES/.test(value):
                this.#_name = "LOVES TRAVEL";
                return;
            case /PILOT TRAVEL CE/.test(value):
                this.#_name = "PILOT TRAVEL";
                return;
            default:
                this.#_name = value.chop_left().replace(/#.*$/, '').trim();
        }
    }
    get name() { return this.#_name; }

    get code() {
        switch (true) {
            case /love/gi.test(this.#_name):
                return "love";
            case /pilot/gi.test(this.#_name):
                return "pilot";
            case /flying/gi.test(this.#_name):
                return "flying";
            case /petro/gi.test(this.#_name):
                return "petro";
            case /ranger/gi.test(this.#_name):
                return "ranger";
            case /gomart|go-mart|go\smart/gi.test(this.#_name):
                return "gomart";
            case /(tulsa terminal|laredo terminal)/gi.test(this.#_name):
                return "melton";
            default:
                return "other";
        }
    }

    read_line_1() {
        const exec_result = regex.line_1.exec(this.line_1);
        this.name = this.line_1.substring(0, exec_result.index).trim();
        this.highway = exec_result[0].trim().replace(' ', '-').trim();
    }

    read_line_2() {
        let exec_result = regex.exit.exec(this.line_2);
        if (!exec_result) exec_result = /$/.exec(this.line_2);
        const city_state = this.line_2.substring(0, exec_result.index).trim();
        const city_state_midpoint = city_state.lastIndexOf(' ');
        this.city = city_state.substring(0, city_state_midpoint).trim();
        this.state = city_state.substring(city_state_midpoint).trim();
        const exit_match = exec_result[0].match(regex.exit_number);
        if (exit_match) {
            this.exit = exit_match[0];
        }
    }

    read() {
        this.read_line_1();
        this.read_line_2();
        this.search_phrase = `${this.name} ${this.city} ${this.state} ${this.highway}`;
    }

    toString() {
        return this.line_1.concat('\n', this.line_2)
    }

}

module.exports = FuelStop;