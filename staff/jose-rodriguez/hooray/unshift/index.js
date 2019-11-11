
Hooray.prototype.unshift = function () {
    var elem;
    var hooray2 = new Hooray;

    for (var x = 0; x<this.length; x++) hooray2[x] = this[x];
    hooray2.length = this.length;
    for (var i = 0; i<arguments.length; i++) {
        debugger
        elem = arguments[i];
        hooray2.length++;
        for (var j=0; j<this.length; j++) {
            debugger
            hooray2[hooray2.length-j-1] = this[this.length -j-1]
            hooray2.length++;

        }
        hooray2[0] = elem;
        this.length++;
    }
    for (var x = 0; x<this.length; x++) this[x] = hooray2[x];
    return this.length;
}