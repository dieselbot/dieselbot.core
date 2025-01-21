const GooglePlacesAPI = require('../infrastructure/google.places.api.js')

class GooglePlacesService {

    #_placesAPI;

    constructor(placesAPI = new GooglePlacesAPI()) {
        this.#_placesAPI = placesAPI;
    }

    async findPlace(fuelstop) {

        const searchText = fuelstop.search_phrase;

        if (!searchText) return;

        let placeResponse = await this.#_placesAPI.textSearch(searchText);

        const warning = `multiple results found for query: "${searchText}"`;

        if (placeResponse.places && placeResponse.places.length > 1) {
            if(fuelstop.exit){
                placeResponse = await this.#_placesAPI.textSearch(`${searchText} ${fuelstop.exit}`);
            } else {
                console.warn(warning);
                return;
            }
        }

        if (placeResponse.places && placeResponse.places.length > 1) {
            console.warn(warning);
            return;
        }

        if (placeResponse.places && placeResponse.places.length == 1) {
            const place = placeResponse.places[0];
            const { code, city, state, highway, exit } = fuelstop;
            return {
                display_name: place.displayName.text,
                address: place.formattedAddress,
                code, city, state, highway, exit,
                website: place.websiteUri,
                map: place.googleMapsUri
            };
        }

        console.warn(`no results found for query: "${searchText}"`);

    }
}

module.exports = GooglePlacesService