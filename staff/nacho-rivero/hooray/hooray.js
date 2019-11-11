function Hooray() {
    for (var i = 0; i  < arguments.length; i++)
        this[i] = arguments[i];

    this.length = arguments.length;
}

/**
 * Iterates the current hooray and evaluates an expression on each item.
 * 
 * @param {Function} expression The expression to evaluate in each item of the hooray.
 * 
 * @throws {TypeError} If expression is not a function.
 */

Hooray.prototype.forEach = function(expression) {
	if(typeof expression !== 'function') throw TypeError(expression + ' is not a function');

	//throw Error('🤡');
	for (var i = 0; i < this.length; i++) 
		expression(this[i], i, this);
};

/**
 * Pushes a variable number of items into this hooray.
 * 
 * @param {...any} item The item (or items) to push.
 * 
 * @returns {number} The new lenth of the hooray.
 */
Hooray.prototype.push = function() { 
	for (var i = 0; i < arguments.length; i++)
		this[this.length++] = arguments[i];

	return this.length;
};

/**
 * The pop method removes the last element of an
 * array, and returns that element.
 * @param {Arguments} arguments The object to pop elements from.
 * 
 * @returns {last} Returns the argument without the last element.
 * 
 * 
 */
 
Hooray.prototype.pop = function() {
    if(this.length === 0) throw TypeError(this + 'is not a Hooray');

	var last = this[this.length - 1];
 
	delete this[this.length - 1];

	this.length = this.length - 1;
 
	return last; 
 
 }

 /**
 * Map method creates a new array with the results of the function 
 * callback applied to each one of its elements.
 * @param {Array} array The array where we will use map() method.
 * @param {Function} expression The expression that will produce elements for the new array.
 * @param {currentValue} array[i] The current element of the array that its being processed.
 * @param {index} i The current index inside the array.
 * @returns {result} result[i] Result is the new array composed by the elements created through the callback function.
 */

Hooray.prototype.map = function(expression) {

	if (!(this instanceof Array)) throw TypeError(array + ' NaN valid');
	 
	var result = [];           
   
	for (var i = 0; i < this.length; i++)
   
	  result[i] = expression(this[i], i, this);

	return result;
 
   }
   
   /**
 * Modifies the array from the start index (default zero) to an end index (default array length). Returns the modified array
 * @param {*} array The array to modificate.
 * @param {*} value The value to introduce in the array.
 * @param {*} start The index in the array to start the introduction of the value.
 * @param {*} end The last index to introduce the value.
 */

Hooray.prototype.fill = function(value, start, end) {
	
    if(!(this instanceof Array)) throw TypeError (this + ' is not an array');
    if(!(this instanceof Function)) throw TypeError (this + ' is not a function');

    if (end){
       
        for (i = start; i<end; i++){
            this[i]=value;
        }

        return  this[i]=value;
        
    } 

    else if (start){

        for (j=start-1; j<this.length-1; j++){ //  
            this[j]=value;
        }

        return  this[j]=value;

    } else 
    
        {

        for (var j=0; j<this.length-1; j++){
            this[j]=value;
        }

        return  this[j]=value;
    }
}

/**
 * To join two or more arrays. This method does not change existing arrays.
 * 
 * @param {...any} item The items array to start joining.
 * @param {...any} item The item (or items) to join.
 * @returns {Array} the new array created with all items joined
 */
/**
 * Concat array with arguments and return a new array with all array elements  + arguments
 * 
 * @param {*} array The array to concatenate elements to newArray
 * 
 * 
 * @returns {*} newArray contains: array + arguments.
 * 
 */
Hooray.prototype.concat = function() { 	
  
	var hoorayAux = new Hooray();	
	
    for (var y = 0; y < this.length; y++){
        hoorayAux[y] = this[y];
    }
		
    for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] instanceof Array) {
			for (var j = 0; j < arguments[i].length; j++){
				hoorayAux[y] = arguments[i][j];
				++y
			}
		} else {
			hoorayAux[y] = arguments[i];
			++y			
		}
	}      
	hoorayAux.length = y;
    return hoorayAux;
    
};


/**
 * Checks if all the elements in the array pass the condition implemented by the given function
 * 
 * @param {Array} array The array to evaluate elements to the condition given 
 * 
 * @param {Function} expression The expression to evaluate in each item of the array.
 * 
 * @returns {boolean} returns true if all the elements in the array pass the condition; otherwise, false.
 * 
 */

Hooray.prototype.every = function (expression) {
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
    
    for (let i = 0; i < this.length; i++) {
        if (!expression(this[i])) return false;
    }
    return true;
};

/**
 * Filter method creates a new array with all the elements that fullfill
 * the established condition by the given function. the results of the function 
 * 
 * @param {Array} array The array to be filtered.
 * @param {Condition} condition Callback that checks the condition on each element of the array.
 * @param {currentValue} array[i] The current element of the array that its being processed.
 * @param {index} i The current index inside the array.
 * @returns {result} result[i] Result is the new array composed by the elements created through the callback function.
 */

Hooray.prototype.filter = function(expression) { 	
  if (typeof expression !== 'function') throw TypeError(expression + ' is not a function')
  var hoorayAux = new Hooray();
  var bool;
  var j = 0;
for (var i = 0; i < this.length; i++) {    
      bool = expression(this[i])   
      if (bool) {  
          hoorayAux[j]=this[i]
          j++
      }           
  }
  hoorayAux.length=j;
  return hoorayAux;
}

/**
 * Returns de value of the fisrt element in the array that satisfies the condition.
 * @param {array} Array The array to be inspected.
 * @param {condition} expression that specifies what condition should be provided.
 */

Hooray.prototype.find = function (expression){
    	
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function')
    var result;
    var bool = false;
	for (var i = 0; i < this.length&&bool===false; i++) {    
        bool = expression(this[i])   
        if (bool) {
            result=this[i]
        }           
    }
    return result;
}


/**
 * Returns the index of the fisrt element in the array that satisfies the providing test function. If any element pass the test, it returs -1.
 * @param {*} array The array given.
 * @param {*} expression The test function.
 */

Hooray.prototype.findIndex = function(expression){
	
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function')
    var result;
    var bool = false;
	for (var i = 0; i < this.length&&bool===false; i++) {    
        bool = expression(this[i])   
        if (bool) result=i;      
    }
    return result;
};

/**
 * Method determines if the element it is included in the array or not. Returns a boolean.
 * @param {*} array The array given.
 * @param {*} value The element to find in the array.
 */

Hooray.prototype.includes = function (value){
    
    var found = false;
    
    for(i=0; i<this.length; i++){
      
        if(this[i] === value){
            found = true;

            return found;
        } 
      return found;  
    } 
}

/**
 * Returns the first index at element can be found in the array. Otherwise,  it returns -1.
 * @param {*} element The element to locate in the array.
 * @param {*} index Optional. The index to start to search
 */

  Hooray.prototype.indexOf = function (item) {
    var start = arguments[1] || 0;

    if (typeof(start) !== "number") start=0;

    start = start < 0 ? this.length + start : start;

    for (var i=start; i<this.length; i++) {
        if (this[i]===item) return i;
    }
    return -1;
}

/**
 * Method returns a new string concatening all elements with a separator introduced. If is not introduced () or it is (',') (''), it returns the elements separated with coma.
 * @param {*} array The array to modificate.
 * @param {*} separator The element to add and use to separate each element.
 */

Hooray.prototype.join = function (separator) {

    if(separator === undefined)
    separator =',';
    result = '';
    for (var i = 0; i < this.length; i++) {
        if (i === this.length - 1)
            result += this[i];
        else
            result +=this[i] + separator;
	} 
    return result;
}


/**
* Executed a reducer function on each element of the array, resulting a single output value.
* @param {array} array The array to reduce.
*/
Hooray.prototype.reduce = function (expression) {
  
  if (expression === undefined) throw TypeError('argument is undefined');
  if (typeof (this) !== 'object') throw TypeError(this + ' is not a Hooray');
  if (this.length === 0) throw TypeError(this + ' is empty');
  var accumulator = 0;
  for (var i = 0; i < this.length; i++) {
    if (i === 0) {
      expression(0, this[i], i, this);
    }
    if (i === 1) {
      accumulator = expression(this[0], this[i], i, this);
    }
    if (i > 1) {
      accumulator = expression(accumulator, this[i], i, this);
    }
  };
  return accumulator;
};

/**
 * Method to reverse the array. It returns the array modified. The last input becomes the first.
 * @param {array} array The array to reverse its numbers.
 * 
 */

Hooray.prototype.reverse = function() { 	

  var arrayAux = [];
  var j = 0;
  for (var i = (this.length-1); i > -1; i--) {
      arrayAux[j] = this[i];       
      j += 1;
  }
  for (var x = 0; x < this.length; x++) {
      this[x] = arrayAux[x];       
  }

  return this;
};

/**
 * Sort the elements of the array and returns the sorted array.
 * @param {*} array array to be sorted.
 */

Hooray.prototype.sort = function() { 	
    var aux;
    for (var i = 1; i < this.length; i++) {
        for (var j = 0; j < this.length - i; j++) {
            if (this[j].toString() > this[j+1].toString()) {
                aux = this[j];
                this[j] = this[j+1];
                this[j+1] = aux;
            }         
        }               
    }
    return this;
}

/**
 * Method removes the first element from an array and it returns the removed element.
 * @param {array} array The array to be shifted.
 * 
 */

Hooray.prototype.shift = function () {

    var deleted = this[0]
    for (var i = 1; i < this.length; i++) {
      this[i-1] = this[i]; 
    }
    delete this[this.length-1]  
      this.length = this.length - 1;
      return deleted;

}

/**
 * Copies a part of the hooray within a new array starting from beginning
 *  to end (end not included). The original array will not be modified.
 * 
 * @param {number} begin Index for starting position 
 * 
 * @param {number} end Index for ending position 
 * 
 * @returns {Hooray} New hooray with the extracted values 
 */

  Hooray.prototype.slice = function slice(begin, end) {
    
    var hoorayAux = new Hooray();

    if (begin > this.length) return hoorayAux;

    begin = begin || 0;
    if (begin < 0){
        begin = this.length + begin;
        if (begin < 0) begin = 0;
    };
    end = end || this.length;
    end = end < 0? this.length + end : end;

    for (var i = begin; i < end; i++)
	   	hoorayAux[i - begin] = this[i];

	hoorayAux.length = end < begin? 0 : end - begin;
    
    return hoorayAux;
};


/**
 * Method test whether at least one element in the array pass the test. It returns a boolean expression.
 * @param {array} array The array to do the test.
 * @param {expression} expression The function test provided.
 */
 
Hooray.prototype.some = function(expression) { 	
  if (typeof expression !== 'function') throw TypeError(expression + ' is not a function')
  var boleana;;
for (var i = 0; i < this.length; i++) {    
      boleana = expression(this[i])
      if (boleana) return true;        
  }
  return false;
};

/**
 * The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
 * Add new elements to the begin of an array. Mutates array and return mutated array length.
 * 
 * @param {Array} array Array to modify, followed by any new element to place at arr begining.
 */

Hooray.prototype.unshift = function() { 	
    
  var newArray = [];

  for (var i = 0; i < arguments.length; i++) {
      newArray[i] = arguments[i];
  }

  for (var j = 0; j < this.length; j++) {
      newArray[j+i] = this[j];
  }

  for (var x = 0; x < newArray.length; x++) {
      this[x] = newArray[x];
  }

  this.length = x;
  return this.length;
};

/**
 * The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
 * 
 * @param {Index} Start The index at which to start changing the array.
 * @param {Integer} delCount An integer indicating the number of elements in the array to remove from start.
 */

Hooray.prototype.splice = function(start, delCount) { 
 
var result = new Hooray; 
var newHooray = []; 
var x = 0; 
var arrPos = 0; 
var itemsLen; 
var items = []; 

if(delCount === 'undefined'){ 
  itemsLen = arguments.length-1;
  var index = 1;
}else if(arguments.length === 2 && start !== 'undefined' && start >= 0 && delCount !== 'undefined'){ 
  var index = 0;
  itemsLen = 0;
}else if(arguments.length === 1){ 
  delCount = this.length-start;
  itemsLen = this.length-start;
} else if(start < 0){ 
  itemsLen = arguments.lenght - delCount + start;
  start = this.length+start;
}else{ 
  itemsLen = arguments.length-2
  var index = 2;
}

if(itemsLen !== 0){
  var finalLength = this.length-delCount;
  for(var y = 0; y<itemsLen; y++){
    items[y] = arguments[index];
    index++;
  }
}else {
  var finalLength = this.length-delCount+itemsLen;
}

for (var i = 0; i < delCount; i++) {
  result[i] = this[i+start];
  result.length++;
}

var lol = false;
while (x < finalLength) {
  if(x === start && lol === false){
    for(var y =0; y<delCount; y++){
      arrPos++
    }
    if(itemsLen !== 0){
      for(var y = 0; y<itemsLen; y++){
        newHooray[x] = items[y]
        x++
      }
    }
    lol = true
  }else{
    newHooray[x] = this[arrPos] 
    x++
    arrPos++
  }
}

for(var i = 0; i<this.length;i++){
  this[i] = newHooray[i]
}

for(var x = delCount; x>0; x--){
  delete this[this.length-1];
  this.length--
}
  return result;
};