Hooray.prototype.findIndex = function (expression) {
    if(typeof expression !== 'function') throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            return i;
        }
    } return -1;
}