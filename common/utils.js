const crypto = require('crypto');

function collapse(){
    return this.replace(/\s+/g, ' ').trim();
}

function chop_left(char = "/") {
    const string_value = this.valueOf();
    if (!char) return string_value;
    return (new RegExp(char)).test(this)
        ? this.substring(0, this.indexOf(char))
        : string_value;
}

function is_empty(value) {
    if (value === false) return false;
    if (value == null || value == undefined || value == '') return true;
    if (JSON.stringify(value) == '{}') return true;
    return false;
}

function read_lines(text) {
    return text.trim().split('\n')
               .map(part => collapse.call(part.trim()))
               .filter(part => part.length > 1);
}

function hash(string_value){
    return crypto.createHash('md5').update(string_value).digest('hex');
}

function get_fuel_stop_id(fuelstop){
    const highway = /\d+/.exec(fuelstop.highway)[0];
    const { code, exit, city, state} = fuelstop;
    return hash(`${code}${exit || ''}${highway}${city}${state}`);
}

module.exports = {
    chop_left,
    collapse,
    is_empty,
    read_lines,
    hash,
    get_fuel_stop_id
}