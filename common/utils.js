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

function check_env(filepath) {
    const env_path = filepath ? filepath: path.join(__dirname, '../.env');
    if(!fs.existsSync(env_path)) {
        console.warn('.env file missing!');
        return;
    }
    fs.readFile(env_path, 'utf8', (err, data) => {
        if (err) {
            console.warn(err);
            return;
        }
        read_lines(data)
            .map(line => line.substring(0, line.indexOf('=')))
            .forEach(key => {
                if(!process.env[key]) console.warn(`${key} not defined.`);
            })
    })
}

function hash(string_value){
    return crypto.createHash('md5').update(string_value).digest('hex');
}

module.exports = {
    check_env,
    chop_left,
    is_empty,
    read_lines,
    hash
}