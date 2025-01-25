module.exports = {
    line_1: /[I|U][-|\s]\d\d/,
    line_2: /.*\s[A-Z]{2}(\s.*|$)/,
    exit: /EX:.*/,
    exit_number: /\d+.*/
}