module.exports = {
    line_1: /[I|U|US|SR|HWY][-|\s]\d+/,
    line_2: /.*\s[A-Z]{2}(\sEX|$)/,
    exit: /(EX|EX:).*/,
    exit_number: /\d+.*/,
    state: /^[A-Z]{2}$/,
    skip_line: /LOAD#:|(^QTY|^EX)/,
}