const PlacesAPI = require('../infrastructure/places.api.js')

class SearchService { 
    _api = new PlacesAPI();
    async findPlace(search_phrase){
        if(!search_phrase) return;
        const mtla = isMTLA(search_phrase);
        if(mtla) return Promise.resolve(mtla);
        const response = await this._api.find_place(search_phrase);
        return _format_place_response(response);
    }
}

function _format_place_response(place_response){
    const response = { name: '', address: '' };
    if(!place_response.places) return response;
    const place = place_response.places ? place_response.places[0] : {};
    response.display_name = place.displayName.text;
    response.address = place.formattedAddress;
    return response;
}

function isMTLA(search_phrase){
    switch (true) {
        case /laredo terminal/i.test(search_phrase):
            return {
                display_name: 'Melton Truck Lines Inc. -Laredo Terminal',
                address: '8720, 8618 Las Cruces Dr, Laredo, TX 78045'
            };
        case /tulsa terminal/i.test(search_phrase):
            return {
                display_name: 'Melton Truck Lines Inc',
                address: '808 N 161st E Ave, Tulsa, OK 74116'
            };
        default:
            return false;
    }
}

module.exports = SearchService