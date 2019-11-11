/**
 * Iteartes an array and evaluates an expression on each item
 * @param {Array} array The array to evaluate
 * @param {Function} expression The function to eval the array
 * 
 * @returns {Boolean} Returns true or false
 */

function every (array, expression) {
    if(!(array instanceof Array)) throw TypeError (array + ' is not an array');
    if(!(expression instanceof Function)) throw TypeError (expression +  ' is not a function')
    for (var i=0; i<array.length; i++) {
        if(!expression(array[i])) {
            return false;
        }
    } return true;
}
