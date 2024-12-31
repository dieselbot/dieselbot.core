const { createClient } = require('redis');

async function getRedisClient(){
    const client = createClient({
        url: process.env.REDIS_URL
    });
    
    await client.connect();

    return client;
}

module.exports = getRedisClient;
