module.exports = {
    line_1: /[I|U|US|SR|HWY][-|\s]\d\d/,
    line_2: /.*\s[A-Z]{2}(\sEX|$)/,
    exit: /(EX|EX:).*/,
    exit_number: /\d+.*/,
    state: /^[A-Z]{2}$/,
    state_code: /^(AK|AL|AR|AZ|CA|CO|CT|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NC|ND|NE|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/,
    skip_line: /LOAD#:|(^QTY|^EX)/,
    new_line: /\n/
}