const path = require('path');
const fs = require('fs');
const crypto = require('crypto')

function chop_left(char) {
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
               .map(part => part.trim())
               .filter(part => part.length > 1);
}

function hash(string_value){
    return crypto.createHash('md5').update(string_value).digest('hex');
}

function get_fuel_stop_id(fuelstop){
    const highway = fuelstop.highway.replace(/-/,'');
    const { code, exit, city, state} = fuelstop;
    return hash(`${code}${exit || ''}${highway}${city}${state}`);
}

module.exports = {
    chop_left,
    is_empty,
    read_lines,
    hash,
    get_fuel_stop_id
}