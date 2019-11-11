

function reverse(array) {
    var stopper = Math.floor(array.length / 2) - 1;
    var first, last;
    for (var i = 0; i <= stopper; i++) {
        first = array[i];
        last = array[array.length - 1 - i];
        array[i] = last;
        array[array.length - 1 - i] = first;
    }
}