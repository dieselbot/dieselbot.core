const GooglePlacesAPI = require('../infrastructure/google.places.api.js')

class GooglePlacesService {

    #_placesAPI;

    constructor(placesAPI = new GooglePlacesAPI()) {
        this.#_placesAPI = placesAPI;
    }

    async findPlace(fuelstop) {

        const searchText = fuelstop.search_phrase;

        if (!searchText) return;

        const placeResponse = await this.#_placesAPI.textSearch(searchText);

        if (placeResponse.places && placeResponse.places.length > 1) {
            console.warn(`multiple results found for query: "${searchText}"`);
            return;
        }

        if (placeResponse.places && placeResponse.places.length == 1) {
            const place = placeResponse.places[0];
            const { code, city, state, highway, exit } = fuelstop;
            return {
                code,
                display_name: place.displayName.text,
                address: place.formattedAddress,
                city, state, highway, exit
            };
        }

        console.warn(`no results found for query: "${searchText}"`);

    }
}

module.exports = GooglePlacesService