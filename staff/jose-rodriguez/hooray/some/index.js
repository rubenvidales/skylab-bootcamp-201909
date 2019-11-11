/**
 * test if at least one element in the array passes the condition passed by a function.
 * @param {Hooray} Hooray The hooray to evaluate.
 * @param {Function} expression expression that evaluates each item on the array.
 * 
 * @returns {Boolean} Returns true if at least one item passes the condition. 
 */

Hooray.prototype.some = function (expression) {
    for (var i = 0; i<this.length; i++) {
       if (expression(this[i])) return true;
    } return false;
 }