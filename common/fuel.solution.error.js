class FuelSolutionError extends Error {
    constructor(message, options = {}) {
        if(!message) message = "invalid fuel solution";
        super(message, options);
        this.errors = options.errors || [];
        this.wiki = 'https://github.com/dieselbot/dieselbot.core/wiki/Fuel-Solution'
    }
}

module.exports = FuelSolutionError;