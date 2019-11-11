Hooray.prototype.map = function (expression) {
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

    var hooray2 = new Hooray();
    for (var i = 0; i < this.length; i++) {
        hooray2[i] = expression(this[i]);
    }
    hooray2.length = this.length;
    return hooray2;
}