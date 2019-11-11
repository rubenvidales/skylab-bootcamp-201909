/**
 * Returns the last element of an array and modify the array substracting the element returned
 * @param {Array} array the array to substract the last element
 * 
 * @returns {...any} the last element of the array.
 */

function pop (array) {
    var a = array[array.length -1];
    array.length -= 1;
    return a
}