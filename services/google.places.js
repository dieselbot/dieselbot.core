const GooglePlacesAPI = require('../infrastructure/google.places.api.js')

class GooglePlacesService {

    #_placesAPI;

    constructor(placesAPI = new GooglePlacesAPI()) {
        this.#_placesAPI = placesAPI;
    }

    async findPlace(fuelstop) {

        const search_text = fuelstop.search_phrase;

        if (!search_text) return;

        let result = await this.#_placesAPI.textSearch(search_text);

        if(!result.success){
            console.warn(result.message);
            return;
        }

        if (result.data.length > 1 && fuelstop.exit) {
            result = await this.#_placesAPI.textSearch(search_text.concat(' exit ', fuelstop.exit));
        }

        const count = result.data.length;

        if(count > 1){
            console.warn(`${count} results found for: "${search_text}"`);
        }

        const place = result.data[0];
        const { code, city, state, highway, exit } = fuelstop;
        return {
            display_name: place.displayName.text,
            address: place.formattedAddress,
            code, city, state, highway, exit,
            website: place.websiteUri,
            map: place.googleMapsUri
        };

    }
}

module.exports = GooglePlacesService