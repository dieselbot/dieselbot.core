const fetch = require('node-fetch');
const Result = require('../domain/result');

class GooglePlacesAPI { 
    textSearch(text_query){
        return fetch('https://places.googleapis.com/v1/places:searchText',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.websiteUri,places.googleMapsUri'
            },
            body: JSON.stringify({
                "textQuery" : text_query
            })
        }).then(async res => {
            const result = new Result();

            if(res.ok){
                const place_response = await res.json();
                if(place_response.places && place_response.places.length > 0){
                    result.success = true;
                    result.data = place_response.places;
                } else {
                    result.message = `no results found for: "${text_query}"`
                }
            } else {
                result.message = res.statusText;
            }

            return result;
        })
    }
}

module.exports = GooglePlacesAPI