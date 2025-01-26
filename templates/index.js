const fs = require('fs');
const { compile } = require('handlebars');

const no_results_found = compile(fs.readFileSync('./no_results_found.html', 'utf8'));
const search_results = compile(fs.readFileSync('./search_results.html', 'utf8'));

module.exports = {
    no_results_found,
    search_results
}
