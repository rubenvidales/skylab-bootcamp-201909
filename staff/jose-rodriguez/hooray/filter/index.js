Hooray.prototype.filter = function (expression) {
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function')

    var r = new Hooray();
    for (var i = 0; i < this.length ;i++) {
        if (expression(this[i])) {
            r[r.length++] = this[i]
        }
    }
    return r;
}