const { chop_left, get_fuel_stop_id } = require("../common/utils");
const regex = require('../common/regex.js');

class FuelStop {
    constructor(text_line_1, text_line_2) {
        this.line_1 = text_line_1;
        this.line_2 = text_line_2;
        this.city = '';
        this.state = '';
        this.highway = '';
        this.exit = null;
        this.website = '';
        this.map = '';
        this.search_phrase = '';
    }

    get id() { return get_fuel_stop_id(this); }

    #_city = null;
    #_name = null;

    set city(value) {
        this.#_city = chop_left.call(value, "/");
    }
    get city() { return this.#_city; }

    set name(value) {
        switch (true){
            case /LOVES #/.test(value):
                this.#_name = "LOVES TRAVEL";
                return;
            case /PILOT TRAVEL CE/.test(value):
                this.#_name = "PILOT TRAVEL";
                return;
            default:
                this.#_name = chop_left.call(value, "/");
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
            case /(tulsa terminal|laredo terminal)/gi.test(this.#_name):
                return "melton";
            default:
                return null;
        }
    }

    read_line_1() {
        const _exec_hwy = regex.line_1.exec(this.line_1);
        if (!_exec_hwy) throw new Error('invalid highway segment: '.concat(this.line_1));
        this.name = this.line_1.substring(0, _exec_hwy.index).trim();
        this.highway = _exec_hwy[0].replace(' ', '-');
        if(!this.name) throw new Error('missing name: '.concat(this.line_1));
        if(!this.highway) throw new Error('missing highway: '.concat(this.line_1));
    }

    read_line_2() {
        let _exec_exit = regex.exit.exec(this.line_2);
        if (!_exec_exit) _exec_exit = /$/.exec(this.line_2)
        const _city_state = this.line_2.substring(0, _exec_exit.index).trim().replace(/\s+/g, ' ');
        const _city_state_midpoint = _city_state.lastIndexOf(' ');
        this.city = _city_state.substring(0, _city_state_midpoint).trim();
        this.state = _city_state.substring(_city_state_midpoint).trim();
        if(this.state.length > 2) throw new Error('missing state: '.concat(this.line_2));
        if(!this.city) throw new Error('missing city: '.concat(this.line_2));

        if (_exec_exit[0].match(regex.exit_number)) {
            this.exit = _exec_exit[0].match(regex.exit_number)[0];
        }
    }

    read() {
        this.read_line_1();
        this.read_line_2();
        this.search_phrase = `${this.name} ${this.city} ${this.state} ${this.highway}`;
    }

}

module.exports = FuelStop;