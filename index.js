const FuelSolution = require('./domain/fuel.solution');
const SearchService = require('./services/search');
const SearchUseCase = require('./application/search.usecase');
// const { FUELSTOP } = require('./common/constants.json');
const getRedisClient = require('./common/getRedisClient');
const FuelStopService = require('./services/fuelstop');

async function search(fuel_solution_text) {
    const search_usecase = new SearchUseCase();
    search_usecase.fuel_solution = new FuelSolution(fuel_solution_text);
    search_usecase.search_service = new SearchService();
    const results = await search_usecase.execute();

    const service = new FuelStopService();

    service.post(results);
    
    // const client = await getRedisClient();
    
    // await client.publish(FUELSTOP.FOUND, JSON.stringify(results));

    // await client.disconnect()

    return results;
}

const fs = `TULSA TERMINAL   I 44        QTY: FILL
TULSA           OK EX: 238
LOVES TRAVEL ST  I 44        QTY: FILL
BIG CABIN       OK EX: 283 
LAREDO TERMINAL  I 35        QTY: FILL
LAREDO          TX EX: 7
PILOT #7976/Pil  I 77        QTY: 93  
TROUTMAN        NC EX: 42  `;

search(fs).then(console.log);
