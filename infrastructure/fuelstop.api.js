const fetch = require('node-fetch');

class FuelStopAPI {
    async post(fuelStops) {
        return fetch(`${process.env.EFS_API_ORIGIN}/fuelstop`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${process.env.EFS_API_KEY}`
            },
            body: JSON.stringify(fuelStops)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw res.statusText;
        })
    }
}

module.exports = FuelStopAPI;
