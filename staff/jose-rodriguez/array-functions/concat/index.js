function concat(array) {
    if (!(array instanceof Array)) throw TypeError('undefined is not an array'); 

    var newArray = [];
    for (var x = 0; x < arguments.length; x++) {

        if (arguments[x] instanceof Array) {
            for (var j = 0; j < arguments[x].length; j++) {
                newArray[newArray.length] = arguments[x][j];
            }
        } else {
            newArray[newArray.length] = arguments[x];
        }
    }
    return newArray;
}