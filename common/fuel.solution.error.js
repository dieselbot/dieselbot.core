class FuelSolutionError extends Error {
    constructor(message, options = {}) {
        super(message, options);
        this.errors = options.errors || [message];
        this.wiki = 'https://github.com/dieselbot/dieselbot.core/wiki/Fuel-Solution'
    }
}

module.exports = FuelSolutionError;