const read_fuel_solution = require('./common/read_fs');
const SearchService = require('./services/search');

async function search(fuel_solution){
    let search_phrases = read_fuel_solution(fuel_solution)
    const searchService = new SearchService();
    return await searchService.findPlaces(search_phrases);
}

const fs = `LOVES TRAVEL ST  I 81        QTY: 52  
HAGERSTOWN      MD EX: 10A            
LOVES #871 TRAV  I 85        QTY: FILL
PIEDMONT        SC EX: 32

** FUEL SOLUTION **     LOAD#: 2739417
PILOT TRAVEL CE  I 74        QTY: FILL
BLOOMINGTON     IL EX: 131            
PILOT TRAVEL CE  I 80        QTY: FILL
AUSTINTOWN      OH EX: 223`;

search(fs).then(console.log);
