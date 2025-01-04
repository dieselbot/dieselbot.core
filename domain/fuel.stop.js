const { chop_left } = require("../common/utils");

class FuelStop {
    constructor(text_line_1, text_line_2) {
        this.line_1 = text_line_1;
        this.line_2 = text_line_2;
        this.city = '';
        this.state = '';
        this.highway = '';
        this.exit = '';
        this.search_phrase = '';
    }
    
    #_city = null;
    #_name = null;

    set city(value){
        this.#_city = chop_left.call(value, "/");
    }
    get city() { return this.#_city; }

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

    set name(value){
        switch (true) {
            case /(pilot\s\#)/gi.test(value):
                this.#_name = "PILOT TRAVEL CE";
            case /(loves\stravel\sst)/gi.test(value):
                this.#_name = "LOVES TRAVEL";
            default:
                this.#_name = chop_left.call(value, "/");
        }
    }
    get name() { return this.#_name; }
    
    get dto() {
        const { code, city, state, highway, exit } = this;
        return { code, city, state, highway, exit };
    }

    read() {
        let _exec_hwy = /I \d\d/.exec(this.line_1);
        let _exec_exit = /EX: \d+/.exec(this.line_2);
        const is_magee = /magee\s+ms/gi.test(this.line_2);

        if (is_magee) {
            _exec_hwy = /U \d\d/.exec(this.line_1);
            _exec_exit = /EX:/.exec(this.line_2);
        };

        const _city_state = this.line_2.substring(0, _exec_exit.index).trim().replace(/\s+/g, ' ');
        const _city_state_midpoint = _city_state.lastIndexOf(' ');

        this.name = this.line_1.substring(0, _exec_hwy.index).trim();
        this.city = _city_state.substring(0, _city_state_midpoint).trim();
        this.state = _city_state.substring(_city_state_midpoint).trim();
        this.highway = _exec_hwy[0].replace(' ', '-');
        this.exit = is_magee ? null : _exec_exit[0].match(/\d+/)[0];

        this.search_phrase = `${this.name} ${this.city} ${this.state} ${this.highway} exit ${this.exit}`;
    }
    
}

FuelStop.isValid = function (fuelstop) {
    const { code, display_name } = fuelstop;
    if (!code || !display_name) return false;
    const code_rgx = new RegExp(code, 'i');
    return code_rgx.test(display_name);
}

module.exports = FuelStop;