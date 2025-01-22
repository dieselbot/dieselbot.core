const fetch = require('node-fetch');

class FuelStopAPI {
    post(fuelStops) {
        return fetch(`${process.env.API_ORIGIN}/fuelstop`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${process.env.API_KEY}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(fuelStops)
        }).then(async (res) => {
            if(!res.ok){
                const message = await res.text();
                console.warn(message);
            }
        })
    }
}

module.exports = FuelStopAPI;
