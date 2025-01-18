const { chop_left } = require("../common/utils");

class FuelStop {
    constructor(text_line_1, text_line_2) {
        if(!text_line_1) throw new Error("missing line 1");
        if(!text_line_2) throw new Error("missing line 2");
        this.line_1 = text_line_1;
        this.line_2 = text_line_2;
        this.city = '';
        this.state = '';
        this.highway = '';
        this.exit = null;
        this.search_phrase = '';
    }

    #_city = null;
    #_name = null;

    set city(value) {
        this.#_city = chop_left.call(value, "/");
    }
    get city() { return this.#_city; }

    set name(value) {
        this.#_name = chop_left.call(value, "/");
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
        const _exec_hwy = /[I|U]+ \d\d/.exec(this.line_1);
        if (!_exec_hwy) throw new Error("fuel stop is missing highway info");
        this.name = this.line_1.substring(0, _exec_hwy.index).trim();
        this.highway = _exec_hwy[0].replace(' ', '-');
    }

    read_line_2() {
        const _exec_exit = /EX:.*/.exec(this.line_2);
        if (!_exec_exit) throw new Error("fuel stop is missing exit info");
        const _city_state = this.line_2.substring(0, _exec_exit.index).trim().replace(/\s+/g, ' ');
        const _city_state_midpoint = _city_state.lastIndexOf(' ');
        this.city = _city_state.substring(0, _city_state_midpoint).trim();
        this.state = _city_state.substring(_city_state_midpoint).trim();

        if (_exec_exit[0].match(/\d+.*/)) {
            this.exit = _exec_exit[0].match(/\d+.*/)[0];
        }
    }

    read() {
        this.read_line_1();
        this.read_line_2();
        this.search_phrase = `${this.name} ${this.city} ${this.state} ${this.highway}`;
    }

}

module.exports = FuelStop;