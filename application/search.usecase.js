class SearchUseCase {
    constructor() {
        this.fuel_solution = null;
        this.search_service = null;
    }
    async execute(){
        this.fuel_solution.read();
        const _search_phrases = this.fuel_solution.fuel_stops
            .reduce((phrases, stop) => [stop.search_phrase, ...phrases], []);
        return await this.search_service.findPlaces(_search_phrases);
    }
}

module.exports = SearchUseCase;