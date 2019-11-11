/**
 * Pushes a variable number of items into this hooray.
 * 
 * @param {...any} item The item (or items) to push.
 * 
 * @returns {number} The new lenth of the hooray.
 */
Hooray.prototype.push = function() { 
	for (var i = 0; i < arguments.length; i++)
		this[this.length++] = arguments[i];

	return this.length;
};