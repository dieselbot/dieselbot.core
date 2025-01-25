const { FuelSolutionError } = require('../common/errors.js');

describe('fuel solution error', () => {
    it('should use default message when no message is provided', () => {
        const default_message = "invalid fuel solution";
        const error = new FuelSolutionError();

        expect(error.message).toEqual(default_message)
    })
})