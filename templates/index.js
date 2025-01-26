const fs = require('fs');
const path = require('path');
const { compile } = require('handlebars');

const invalid_fuel_solution = compile(fs.readFileSync(path.join(__dirname, './invalid_fuel_solution.html'), 'utf8'));
const no_results_found = compile(fs.readFileSync(path.join(__dirname, './no_results_found.html'), 'utf8'));
const search_results = compile(fs.readFileSync(path.join(__dirname, './search_results.html'), 'utf8'));

module.exports = {
    invalid_fuel_solution,
    no_results_found,
    search_results
}
