module.exports = {
    line_1: /((\s|^)((I)|(U)|(US)|(SR)|(HWY)))[-|\s]\d+/,
    line_2: /.*\s[A-Z]{2}(\sEX|$)/,
    exit: /(\sEX|\sEX:).*/,
    exit_number: /\d+.*/,
    state: /^[A-Z]{2}$/,
    skip_line: /LOAD#:|(^QTY|^EX)/,
}