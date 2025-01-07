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

module.exports = {
    chop_left,
    is_empty
}