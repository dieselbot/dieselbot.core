class SearchUseCase {
    constructor() {
        this.fuel_solution = null;
        this.search_service = null;
    }
    async execute() {
        this.fuel_solution.read();
        const _self = this;
        const results = this.fuel_solution.fuel_stops.map((stop) => {
            return _self.search_service
                .findPlace(stop.search_phrase)
                .then(result => {
                    delete result.name;
                    delete stop.name;
                    delete stop.line_1;
                    delete stop.line_2;
                    delete stop.search_phrase;
                    return { ...result, ...stop }
                })
        }, [])
        return Promise.all(results);
    }
}

module.exports = SearchUseCase;