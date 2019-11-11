function shift(array) {
    var item = array[0];
    for (var i = 0; i< array.length; i++) {
        array[i] = array[i+1];
    }
    array.length--;
    return item;
}