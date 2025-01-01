class FuelStop {
    constructor(text_line_1, text_line_2) {
        this.line_1 = text_line_1;
        this.line_2 = text_line_2;
        this.code = '';
        this.name = '';
        this.city = '';
        this.state = '';
        this.highway = '';
        this.exit = '';
        this.search_phrase = '';
    }
    read() {
        const _exec_hwy = /I \d\d/.exec(this.line_1);
        const _exec_exit = /EX: \d+/.exec(this.line_2);
        const _city_state = this.line_2.substring(0, _exec_exit.index).trim().replace(/\s+/g, ' ');
        const _city_state_midpoint = _city_state.lastIndexOf(' ');

        this.name = this.line_1.substring(0, _exec_hwy.index).trim();
        this.city = _city_state.substring(0, _city_state_midpoint).trim();
        this.state = _city_state.substring(_city_state_midpoint).trim();
        this.highway = _exec_hwy[0].replace(' ', '-');
        this.exit = _exec_exit[0].match(/\d+/)[0];

        this.name = normalize.name(this.name);
        this.city = normalize.city(this.city);
        this.code = get_code(this.name);
        
        this.search_phrase = `${this.name} ${this.city} ${this.state} ${this.highway} exit ${this.exit}`;
    }
}

const normalize = {
    name: function (name) {
        switch (true) {
            case /(pilot\s\#)/gi.test(name):
                return "PILOT TRAVEL CE";
            case /(loves\stravel\sst)/gi.test(name):
                return "LOVES TRAVEL";
            case /\//.test(name):
                return name.substring(0, name.indexOf('/'))
            default:
                return name
        }
    },
    city: function (city) {
        let n = city.indexOf('/');
        if (n > 0) {
            return city.substring(0, n);
        }
        return city;
    }
}

function get_code(name){
    switch (true) {
        case /love/gi.test(name):
            return "loves";
        case /pilot/gi.test(name):
                return "pilot";
        case /flying/gi.test(name):
            return "flyingj";
        case /petro/gi.test(name):
            return "petro";
        case /melton/gi.test(name):
                return "melton";
        default:
            return null;
    }
}

module.exports = FuelStop;