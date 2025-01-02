const GooglePlacesAPI = require('../infrastructure/google.places.api.js')

const _placesAPI = new GooglePlacesAPI();

class GooglePlacesService {
    async findPlace(searchText){
        
        if(!searchText) return;

        const placeResponse = await _placesAPI.textSearch(searchText);

        if(placeResponse.places && placeResponse.places.length > 1){
            console.log(`multiple results found for query: "${searchText}"`);
            return;
        }

        if(placeResponse.places && placeResponse.places.length == 1){
            const place = placeResponse.places[0];
            return {
                display_name: place.displayName.text,
                address: place.formattedAddress
            };
        }

        console.log(`no results found for query: "${searchText}"`);
        
    }
}

module.exports = GooglePlacesService