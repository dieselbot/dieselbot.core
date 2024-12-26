const replace_city = require('../common/replace.city.js');
const replace_name = require('../common/replace.name.js');

class FuelStop {
    constructor(text_line_1, text_line_2) {
        this.line_1 = text_line_1;
        this.line_2 = text_line_2;
        this.name = '';
        this.city = '';
        this.state = '';
        this.highway = '';
        this.exit = '';
        this.search_phrase = '';
    }
    read(){
        const _exec_hwy = /I \d\d/.exec(this.line_1);
        const _exec_exit = /EX: \d+/.exec(this.line_2);
        const _city_state = this.line_2.substring(0, _exec_exit.index).trim().replace(/\s+/g, ' ');
        const _city_state_midpoint = _city_state.lastIndexOf(' ');
        
        this.name = this.line_1.substring(0,_exec_hwy.index).trim();
        this.city = _city_state.substring(0, _city_state_midpoint).trim();
        this.state = _city_state.substring(_city_state_midpoint).trim();
        this.highway = _exec_hwy[0].replace(' ','-');
        this.exit = _exec_exit[0].match(/\d+/)[0];

        this.name = replace_name(this.name);
        this.city = replace_city(this.city);

        this.search_phrase = `${this.name} ${this.city} ${this.state} ${this.highway} exit ${this.exit}`;
    }
}

module.exports = FuelStop;