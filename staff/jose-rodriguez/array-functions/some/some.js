/**
 * test if at least one element in the array passes the condition passed by a function.
 * @param {Array} array The array to evaluate.
 * @param {Function} expression expression that evaluates each item on the array.
 * 
 * @returns {Boolean} Returns true if at least one item passes the condition. 
 */

function some(array,expression) {
   for (var i = 0; i<array.length; i++) {
      if (expression(array[i])) return true;
   } return false;
}