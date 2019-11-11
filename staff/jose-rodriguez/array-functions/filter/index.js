

function filter(array,expression) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if(!(expression instanceof Function)) throw TypeError(expression + ' is not a function');
    var newArray = [];
    for(var i=0; i<array.length; i++){
        if(expression(array[i])) {
            newArray[newArray.length] = array[i];
        }
    } return newArray;
}