const fetch = require('node-fetch')
const _google_api_key = process.env.GOOGLE_API_KEY;

class PlacesAPI { 
    async find_place(search_phrase){
        return fetch('https://places.googleapis.com/v1/places:searchText',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': _google_api_key,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel'
            },
            body: JSON.stringify({
                "textQuery" : search_phrase
            })
        }).then(res => {
            if(res.ok){
                return res.json();
            }
            throw res.statusText;
        })
    }
}

module.exports = PlacesAPI