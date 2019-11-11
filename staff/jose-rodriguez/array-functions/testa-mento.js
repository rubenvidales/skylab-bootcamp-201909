/**
 * Describes a test suite.
 * 
 * @param {string} title The test suite title.
 * @param {*} expression The tests to be run.
 * 
 * @version 1.0.0
 */
function describe(title, expression) {
	console.log('%cTEST', 'font-weight: bold;', title); 

	expression();
}

/**
 * Runs a unit test.
 * 
 * @param {string} title The test unit title.
 * @param {Function} expression The test to evaluate.
 * @param {Function} onError A callback to evaluate possible error.
 */
function it(title, expression, onError) {
	console.log('%cCASE', 'font-weight: bold;', title);

	try {
		expression();
    } catch(error) {
		onError(error);
    }
}

/**
 * Checks wether a value matches a condition.
 * 
 * @param {*} result 
 */
function expect(result) {
	return {
		/**
		 * Checks result matches exactly an expected value.
		 * 
		 * @param {*} expected The expected value to match against result.
		 */
		toBe: function(expected) {
			if (result === expected) console.info('%cOK 👍', 'color: green; font-weight: bold;');
			else console.error('KO 👎', 'expected ' + expected + ' , but got ' + result);
        }
    }
}