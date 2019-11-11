/**
 * Itearates an array and evaluates an expression on each item.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} expression The expression to evaluate in each item of the array.
 */
function forEach(array, expression) {
	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
	if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

	(function loop (index){
		expression(array[index], index)
		++index < array.length && loop(index);
	})(0);	
	// for (var i = 0; i < array.length; i++) 
	// 	expression(array[i]);
}