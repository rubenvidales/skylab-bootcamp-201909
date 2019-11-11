function unshift (array) {
    var elem;
    var array2 = [];
    for (var x = 0; x<array.length; x++) array2[x] = array[x];
    for (var i = 1; i<arguments.length; i++) {
        debugger
        elem = arguments[i];
        array2.length++;
        for (var j=0; j<array.length; j++) {
            debugger
            array2[array2.length-j-1] = array[array.length -j-1]

        }
        array2[0] = elem;
        array.length++;
    }
    for (var x = 0; x<array.length; x++) array[x] = array2[x];
    return array.length;
}