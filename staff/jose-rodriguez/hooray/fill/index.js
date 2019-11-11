Hooray.prototype.fill = function (item) {
    if (typeof item === undefined) throw ReferenceError(item + 'is not defined')
    var start = arguments.length > 1 ? arguments[1] : 0;
    var end = arguments.length > 2 ? arguments[2] : this.length;

    start = start < 0 ? this.length + start : start

    for (var i = start; i < end; i++) {
        this[i] = item;
    } return this;
}