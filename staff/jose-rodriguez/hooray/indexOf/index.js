
Hooray.prototype.indexOf = function (item){
    if(typeof item === undefined) throw (ReferenceError, item + ' is not defined');
    for (var i = 0; i<this.length; i++) {
        if (this[i]=== item) return i;
    
    } return -1;
}