/**
 * Pushes a variable number of items into an array.
 * 
 * @param {Array} array The array to push elements to.
 * @param {...any} item The item (or items) to push.
 * 
 * @returns {number} The new lenth of the array.
 */
function push(array) { 
	console.log(arguments) 

	for (var i = 1; i < arguments.length; i++)
		array[array.length] = arguments[i]

	return array.length
}