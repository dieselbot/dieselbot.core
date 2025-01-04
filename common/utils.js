function chop_left(char) {
    const string_value = this.valueOf();
    if(!char) return string_value;
    return (new RegExp(char)).test(this)
    ? this.substring(0, this.indexOf(char)) 
    : string_value;
}

module.exports = {
    chop_left
}