Hooray.prototype.shift = function () {
    var item = this[0];
    for (var i = 0; i< this.length; i++) {
        this[i] = this[i+1];
    }
    this.length--;
    return item;
}