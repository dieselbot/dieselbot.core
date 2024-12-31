const FuelSolution = require('./domain/fuel.solution');
const SearchService = require('./services/search');
const SearchUseCase = require('./application/search.usecase');
const { FUEL_STOP_FOUND_CHANNEL } = require('./common/constants.json');

const { createClient } = require('redis');

async function search(fuel_solution_text) {
    const search_usecase = new SearchUseCase();
    search_usecase.fuel_solution = new FuelSolution(fuel_solution_text);
    search_usecase.search_service = new SearchService();
    const results = await search_usecase.execute();
    
    const client = createClient({
        url: process.env.REDIS_URL
    });
    
    await client.connect();
    
    await client.publish(FUEL_STOP_FOUND_CHANNEL, JSON.stringify(results));
    
    await client.disconnect()

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
