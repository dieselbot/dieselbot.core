const FuelSolution = require('./domain/fuel.solution');
const SearchUseCase = require('./application/search.usecase');
const FuelStopService = require('./services/fuelstop');

async function search(fuel_solution_text) {
    const search_usecase = new SearchUseCase();
    search_usecase.fuel_solution = new FuelSolution(fuel_solution_text);

    const results = await search_usecase.execute();

    if (search_usecase.missing_fuel_stops.length > 0) {
        const service = new FuelStopService();
        service.post(search_usecase.missing_fuel_stops);
    }

    return results;
}

const fs = `TULSA TERMINAL   I 44        QTY: FILL
TULSA           OK EX: 238
LOVES TRAVEL ST  I 44        QTY: FILL
BIG CABIN       OK EX: 283 
LAREDO TERMINAL  I 35        QTY: FILL
LAREDO          TX EX: 7
PILOT #7976/Pil  I 77        QTY: 93  
TROUTMAN        NC EX: 42`;

search(fs).then(console.log);
