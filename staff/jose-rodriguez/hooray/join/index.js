Hooray.prototype.join = function(separator){
    var str;

    if (this.length === 0) {
        str = "";
    } else if (this.length === 1) {
        str = hooray[0];
    } else {
        str = this[0];
        for (var i = 1; i < this.length; i++) {
            str = str + (separator || ',') + this[i];
        }
    }
    return str;
}