Hooray.prototype.reverse = function (){
    var stopper = Math.floor(this.length / 2) - 1;
    var first, last;
    for (var i = 0; i <= stopper; i++) {
        first = this[i];
        last = this[this.length - 1 - i];
        this[i] = last;
        this[this.length - 1 - i] = first;
    }
}