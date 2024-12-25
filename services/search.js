const PlacesAPI = require('../infrastructure/places_api.js')

function _format_place_response(place_response){
    const response = { name: '', address: '' };
    if(!place_response.places) return response;
    const place = place_response.places ? place_response.places[0] : {};
    response.name = place.displayName.text;
    response.address = place.formattedAddress;
    return response;
}

class SearchService { 
    _api = new PlacesAPI();
    async findPlace(search_phrase){
        if(!search_phrase) return;
        const response = await this._api.find_place(search_phrase);
        return _format_place_response(response);
    }
    async findPlaces(search_phrases){
        if (!search_phrases || ! search_phrases.length) return {}

        return await Promise.all(search_phrases.map(phrase => {
            return this.findPlace(phrase)
        }))
    }
}

module.exports = SearchService