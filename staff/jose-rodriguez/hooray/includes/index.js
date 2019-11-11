Hooray.prototype.includes = function (elem, start) {

    for (var i = start || 0; i < this.length; i++) {
        if (elem === this[i]) return true;
    } return false;
}
