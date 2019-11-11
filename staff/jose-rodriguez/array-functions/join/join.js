

function join(array) {
    var str;
    var separator = arguments.length > 1
        ? arguments[1]
        : ',';

    if (array.length === 0) {
        str = "";
    } else if (array.length === 1) {
        str = array[0];
    } else {
        str = array[0];
        for (var i = 1; i < array.length; i++) {
            str = str + separator + array[i];
        }
    }
    return str;
}