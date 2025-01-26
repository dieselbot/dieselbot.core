const Result = require("./result");

class SearchResult extends Result{    
    constructor() {
        super();
        this.not_found = [];
    }
}

module.exports = SearchResult;