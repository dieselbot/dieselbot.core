function chop_left(char) {
    return (new RegExp(char)).test(this)
    ? this.substring(0, this.indexOf(char)) 
    : this.valueOf();
}

module.exports = {
    chop_left
}