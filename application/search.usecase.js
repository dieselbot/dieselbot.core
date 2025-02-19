const FuelSolution = require('../domain/fuel.solution');
const SearchResult = require('../domain/search.result');
const globalEmitter = require('../common/global.emitter');
const { found } = require('../common/constants.json');
const { RepoSearchHandler, PlaceSearchHandler } = require('./search.handlers');

class SearchUseCase {
    constructor(fuel_solution = new FuelSolution()) {
        this.fuel_solution = fuel_solution;
    }

    async execute() {
        const result = new SearchResult();

        try {
            this.fuel_solution.read();
        } catch (error) {
            result.error = error;
            result.message = error.message;
            return result;
        }

        const search_context = {
            fuel_stops: this.fuel_solution.fuel_stops,
            found: null,
            unlisted: [],
            not_found: null
        };

        const searchRepo = new RepoSearchHandler();
        searchRepo.setNextHandler(new PlaceSearchHandler());
        await searchRepo.handle(search_context);

        result.data = search_context.found.concat(search_context.unlisted);
        result.not_found = search_context.not_found;

        if (result.data.length > 0) {
            result.success = true;
            if (search_context.unlisted.length > 0) {
                globalEmitter.emit(found.unlisted_fuel_stops, search_context.unlisted);
            }
        } else {
            result.message = "no results found";
        }

        return result;
    }
}

module.exports = SearchUseCase;