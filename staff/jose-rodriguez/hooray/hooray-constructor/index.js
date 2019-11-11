/**
 * Emulates an array following "EXACTLY" (the most accurate possible :) Array.prototype method's.
 * 
 * @param args {*} The initial length of the Hooray (on single numeric argument), or the initial values (on multiple arguments).
 */
function Hooray() {
	if (arguments.length === 1 && typeof arguments[0] === 'number') this.length = arguments[0];
	else {
		for (var i = 0; i < arguments.length; i++)
			this[i] = arguments[i];

		this.length = arguments.length;
	}
}
















