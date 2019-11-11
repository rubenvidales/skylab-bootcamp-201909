describe('Hooray prototype', function () {

    describe('Hooray.prototype.pop', function () {

        var numbers;

        beforeEach(function () {
            numbers = new Hooray(1, 2, 3);
        });

        it('should pop only 1 value', function () {
            
            var result = numbers.pop();
            var expectNumbers = new Hooray(1, 2);;

            expect(numbers).toEqual(expectNumbers);
            expect(result).toBe(3);
            expect(numbers.length).toBe(2);

        });

        it('should be a hooray', function() {
            var number = new Hooray();

            expect(function () { number.pop() ;}).toThrowError(TypeError, number + 'is not a Hooray');
        })
    });

    describe('Hooray.prototype.push', function () {

        var hooray;

        beforeEach(function () {
            hooray = new Hooray('a', 'b', 'c');

        })

        it('should push a single item', function () {


            expect(hooray.push('d')).toBe(4);
            expect(hooray.length).toBe(4);
            expect(hooray[hooray.length - 1]).toBe('d');

            var chars = ['a', 'b', 'c', 'd'];
            for (var i = 0; i < chars.length; i++)
                expect(hooray[i]).toBe(chars[i]);
        });

        it('should push multiple items', function () {

            expect(hooray.push('d', 'e', 'f', 'g', 'h', 'i', 'j', 'k')).toBe(11);
            expect(hooray.length).toBe(11);

            var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
            for (var i = 0; i < hooray.length; i++)
                expect(hooray[i]).toBe(chars[i]);
        });
    });

    describe('Hooray.prototype.forEach', function () {

        var numbers, hooray;

        beforeEach(function () {
            numbers = new Hooray(1, 2, 3);
            hooray = new Hooray(1, 2, 3);
        })

        it('should succeed on correct hooray and expression, adding all numbers', function () {

            var result = 0;
            var add = function (number) { result += number; return result;};
            
            numbers.forEach(add);

            expect(result).toBe(6);
        });

        it('should succeed on correct hooray and expression, concatenating all numbers', function () {

            var result = '';
            var concatenate = function (number) { result = result += number; };

            numbers.forEach(concatenate);

            expect(result).toBe('123');
        });


        it('should succeed on correct hooray and expression, multiplying all numbers by 10', function () {

            var result = [];
            var multiply = function (number, index) { result[index] = number * 10; };

            numbers.forEach(multiply);

            expect(result.length).toBe(numbers.length);

            for (var i = 0; i < result.length; i++)
                expect(result[i]).toBe(numbers[i] * 10);
        });

        it('should fail on undefined expression', function () {
            var hooray = new Hooray(1, 2, 3);
            var expression; // = console.log;
            
            expect(function () { hooray.forEach(expression); }).toThrowError(TypeError, 'undefined is not a function');
        });

        it('should fail on non-function expression', function () {

            expect(function () { hooray.forEach(undefined); }).toThrowError(TypeError, 'undefined is not a function');
            expect(function () { hooray.forEach(true); }).toThrowError(TypeError, 'true is not a function');
            expect(function () { hooray.forEach(1); }).toThrowError(TypeError, '1 is not a function');
        });
    });

        describe('Hooray.prototype.concat', function () {
            it('should concatenate the array passed with hooray elements and create a new hooray', function () {
                var hooray = new Hooray(1, 2, 3);
        
                var array = [4,5,6]
        
                var result = hooray.concat(array);
        
                expect(result.length).toBe(6);
                expect(hooray.length).toBe(3);
                expect(result).not.toBe(hooray);
                expect(result).toBeInstanceOf(Hooray);
        
                expect(result[0]).toBe(1);
                expect(result[1]).toBe(2);
                expect(result[2]).toBe(3);
                expect(result[3]).toBe(4);
                expect(result[4]).toBe(5);
                expect(result[5]).toBe(6);
        
                expect(hooray[0]).toBe(1);
                expect(hooray[1]).toBe(2);
                expect(hooray[2]).toBe(3);
            });
        
            it('should concatenate the elements passed with hooray elements and create a new hooray', function () {
                var hooray = new Hooray(1, 2, 3);
        
                var array = [4,5,6]
        
                var result = hooray.concat(array,7,8,9);
        
                expect(result.length).toBe(9);
                expect(hooray.length).toBe(3);
                expect(result).not.toBe(hooray);
                expect(result).toBeInstanceOf(Hooray);
        
                expect(result[0]).toBe(1);
                expect(result[1]).toBe(2);
                expect(result[2]).toBe(3);
                expect(result[3]).toBe(4);
                expect(result[4]).toBe(5);
                expect(result[5]).toBe(6);
                expect(result[6]).toBe(7);
                expect(result[7]).toBe(8);
                expect(result[8]).toBe(9);
        
                expect(hooray[0]).toBe(1);
                expect(hooray[1]).toBe(2);
                expect(hooray[2]).toBe(3);
            });
        
        });

    describe('Hooray.prototype.every', function () {
        it('should print true if all elements meet the condition', function () {
            var numbers = new Hooray(2, 3, 4, 5);
            
            var majorOne = function (item) {  return item > 1; };
            expect(numbers.every(majorOne)).toBe(true);
        });
        it('should print false if any element does not fulfill the condition', function () {
            var numbers = new Hooray(2, 3, 4, 5);
            
            var minorOne = function (item) {  return item < 1; };
            expect(numbers.every(minorOne)).toBe(false);
        });
        it('should fail on non-function expression', function () {
            var numbers = new Hooray(2, 3, 4, 5);
            expect(function() { numbers.every(undefined); }).toThrowError(TypeError, 'undefined is not a function');
            expect(function() { numbers.every(true); }).toThrowError(TypeError, 'true is not a function');
            expect(function() { numbers.every(1); }).toThrowError(TypeError, '1 is not a function');
        });
    });

    describe('Hooray.prototype.filter', function () {
    
        it('should fail on undefined expression', function () {
            var hooray = new Hooray(1, 2, 3);
            var expression; // = console.log;
    
            expect(function() { hooray.filter(expression); }).toThrowError(TypeError, 'undefined is not a function');
        });
    
        it('should fail on non-function expression', function () {
            var hooray = new Hooray(1, 2, 3);
    
            expect(function () { hooray.filter(undefined); }).toThrowError(TypeError, 'undefined is not a function');
            expect(function() { hooray.filter(true); }).toThrowError(TypeError, 'true is not a function');
            expect(function() { hooray.filter(1); }).toThrowError(TypeError, '1 is not a function');
        });
    });

    describe('Hooray.prototype.find', function () {
    
        it('should fail on undefined expression', function () {
            var hooray = new Hooray(1, 2, 3);
            var expression; // = console.log;
    
            expect(function() { hooray.find(expression); }).toThrowError(TypeError, 'undefined is not a function');
        });
    
        it('should fail on non-function expression', function () {
            var hooray = new Hooray(1, 2, 3);
    
            expect(function () { hooray.find(undefined); }).toThrowError(TypeError, 'undefined is not a function');
            expect(function() { hooray.find(true); }).toThrowError('true is not a function');
            expect(function() { hooray.find(1); }).toThrowError('1 is not a function');
        });
    });

    describe('Hooray.prototype.findIndex', function () {
        it('should return the index that meet the expression', function () {
            var hooray = new Hooray(1,2,3,4,5,6,7,8);
            var expression = function(currentValue) { return currentValue > 5; }
        
            var result= hooray.findIndex(expression);
    
            expect(result).not.toBe(hooray);
            expect(result).not.toBeInstanceOf(Hooray);
            expect(hooray.length).toBe(8);
            expect(result).toBe(5);
    
        });
    
        it('should fail on undefined expression', function () {
            var hooray = new Hooray(1, 2, 3);
            var expression; // = console.log;
    
            expect(function() { hooray.findIndex(expression); }).toThrowError(TypeError, 'undefined is not a function');
        });
    
        it('should fail on non-function expression', function () {
            var hooray = new Hooray(1, 2, 3);
    
            expect(function () { hooray.findIndex(undefined); }).toThrowError(TypeError, 'undefined is not a function');
            expect(function() { hooray.findIndex(true); }).toThrowError(TypeError, 'true is not a function');
            expect(function() { hooray.findIndex(1); }).toThrowError(TypeError, '1 is not a function');
        });
    });
    

    describe('Hooray.prototype.includes', function () {
    
        it('should not find the past arguments in the hooray elements(one argument)', function () {
            var hooray = new Hooray(1, 2, 3, 4, 5);
    
            var finded = hooray.includes(7);
    
            expect(finded).toBe(false);
            expect(hooray.length).toBe(5);
                   
            expect(hooray[0]).toBe(1);
            expect(hooray[1]).toBe(2);
            expect(hooray[2]).toBe(3);
            expect(hooray[3]).toBe(4);
            expect(hooray[4]).toBe(5);
        });
    
    });

    describe ('Hooray.prototype.indexOf', function () {


        it ('should return the first index where the item is found', function () {
    
            var hooray = new Hooray (1,2,3,4,5,6,7,8,9,0);
    
            expect(hooray.indexOf(5)).toBe(4);
        })
    
        it ("should start searching from the end when a negative starting is sent", function () {
    
            var hooray = new Hooray (1,2,3,4,5,6,7,8,9,0);
    
            expect(hooray.indexOf(3,-5)).toBe(-1);
        })
    
        it ("should return -1 when Item's not found", function () {
    
            var hooray = new Hooray (1,2,3,4,5,6,7,8,9,0);
    
            expect(hooray.indexOf(10)).toBe(-1);
        })
    
        it ('should return the first index where the item is found when a starting is specified', function () {
    
            var hooray = new Hooray (1,2,3,4,5,6,7,8,9,0);
    
            expect(hooray.indexOf(5,3)).toBe(4);
        })
    
        it ("should return -1 when Item's not found when a starting is specified", function () {
    
            var hooray = new Hooray (1,2,3,4,5,6,7,8,9,0);
            
            expect(hooray.indexOf(3,5)).toBe(-1);
        })
    
        it ("should return -1 when am empty hooray calls indexOf() or any item is scepecified", function () {
    
            var hooray = new Hooray ();
            expect(hooray.indexOf(5)).toBe(-1);
    
            hooray = new Hooray(1,2,3);
            expect(hooray.indexOf(5)).toBe(-1);
        })
    
        it ("should start searching at index 0 when a invalid starting is sent", function () {
    
            var hooray = new Hooray (1,2,3,4,5,6,7,8,9,0);
            expect(hooray.indexOf(3,"5")).toBe(2);
        })
    
        it ("shouldn't modify the original hooray", function () {
    
            var hooray = new Hooray (1,2,3,4);
            var test = new Hooray (1,2,3,4);
    
    
            var restult = hooray.indexOf(3);
    
            expect(hooray).toEqual(test);
        })
    })

   describe('Hooray.prototype.join', function(){
    
    it('Should succeed the operation, returning a new string by joining all of the elements in an array separated by empty string or a specified separator string', function(){


        var hooray, result, expected;

        hooray = new Hooray (1, 2, 3, 4);

        expected = ("1234");
        result = hooray.join('');

        
        expect(result).toEqual(expected);
    });
    
   
    it('Should succeed the operation, returning a new string by joining all of the elements in an array separated with a specified speartor ,in this case ' , function() {
        var hooray, result, expected;

        hooray = new Hooray(1, 2, 3, 4);
        result = hooray.join(', ');
        expected = ("1, 2, 3, 4")
        
        
        expect(result).toEqual(expected);
    });

     
    it('Should succeed the operation, returning the same string by joining all of the elements in an array with non-specify command', function() {
        var hooray, result, expected;

        hooray = new Hooray(1, 2, 3, 4);
        result = hooray.join();
        expected = "1,2,3,4";
        
        expect(result).toEqual(expected);
    }); 

    it('Should succeed the operation, the type of result should be string if we dont introduce any command', function() {
        var hooray, result, expected;

        hooray = new Hooray(1, 2, 3, 4);
        
        result = hooray.join();
        expected = typeof hooray;

        expect(typeof result).toEqual(typeof expected);
    }); 

    
    it('should succeed the operation, returning the same array´s values but in string introducing undefined as separator', function () {
        
        var hooray, result, expected;

        hooray = new Hooray(1, 2, 3, 4);
        result = hooray.join(undefined);
        expected = "1,2,3,4"

        expect(result).toEqual(expected); 

    });
    
    
});

   describe('reduce', function () {
    it('sum', function () {
      var numbers = new Hooray(1, 2, 3, 4, 5);
      var result = 15;
      function callback(acc, cur) { return acc + cur }
      var resultReduce = numbers.reduce(callback);
      expect(resultReduce).toBe(result)
    });
    it('rest', function () {
      var numbers = new Hooray(1, 2, 3, 4, 5);
      var result = -13;
      function callback(acc, cur) { return acc - cur }
      var resultReduce = numbers.reduce(callback);
      expect(resultReduce).toBe(result)
    });
    it('mult', function () {
      var numbers = new Hooray(1, 2, 3, 4, 5);
      var result = 120;
      function callback(acc, cur) { return acc * cur }
      var resultReduce = numbers.reduce(callback);
      expect(resultReduce).toBe(result)
    });
    it('div', function () {
      var numbers = new Hooray(1, 2, 3, 4, 5);
      var result = 0.008333333333333333;
      function callback(acc, cur) { return acc / cur }
      var resultReduce = numbers.reduce(callback);
      expect(resultReduce).toBe(result)
    });
    it('should fail when no declared arguments', function () {
      var numbers = new Hooray(1, 2, 3, 4, 5);
      var expression;
      expect(function () { numbers.reduce(expression); }).toThrowError(TypeError, 'argument is undefined');
    });
    it('should fail when no declared arguments', function () {
      var numbers = new Hooray();
      var expression;
      expect(function () { numbers.reduce(expression); }).toThrowError(TypeError, 'argument is undefined');
    });
    
  })

  describe('Hooray.prototype.reverse', function () {
    it('should reverse numbers', function () {
        var hooray = new Hooray(3,6,1,2,8,5,7);
        
        hooray.reverse();

        expect(hooray).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(7);
               
        var chars = [7,5,8,2,1,6,3];
        for (var i = 0; i < chars.length; i++)
        expect(hooray[i]).toBe(chars[i]);
    });

    it('should insert a multiple items at the beginning of the array', function () {
        var hooray = new Hooray('a', 'j', 'o', 'E', 'e');
        
        hooray.reverse();

        expect(hooray).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(5);

        var chars = ["e", "E", "o", "j", "a"];
        for (var i = 0; i < chars.length; i++)
        expect(hooray[i]).toBe(chars[i]);
    });

});

describe('Hooray.prototype.sort', function () {
    it('should sort numbers', function () {
        var hooray = new Hooray(3,6,1,2,8,5,7);
        
        hooray.sort();

        expect(hooray).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(7);
               
        var expected = new Hooray(1, 2, 3, 5, 6, 7, 8);
        expect(hooray).toEqual(expected);
    });

    it('should insert a multiple items at the beginning of the array', function () {
        var hooray = new Hooray('a', 'j', 'o', 'E', 'e');
        
        hooray.sort();

        expect(hooray).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(5);
               
        var expected = new Hooray("E", "a", "e", "j", "o");
        expect(hooray).toEqual(expected);
    });

});

describe('Hooray.prototype.shift', function () {
    it('should delete the first element', function () {
        var hooray = new Hooray(1, 2, 3);

        var firstElement = hooray.shift();

        expect(firstElement).toBe(1);
        expect(hooray.length).toBe(2);

        var chars = [2, 3];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars[i]);
    });

});

describe('Hooray.prototype.slice', function () {
    it('should return a new array with the values in the given limits', function () {
        var hooray = new Hooray(1,2,3,4,5,6,7,8,9);

        var result = hooray.slice(3, 7);

        expect(result).not.toBe(hooray);
        expect(result.length).toBe(4);
        expect(result).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(9);

        var chars = [4,5,6,7];
        for (var i = 0; i < chars.length; i++)
            expect(result[i]).toBe(chars[i]);

        var chars1 = [1,2,3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars1[i]);

    });

    it('should return a new array with the values in from the beginning (no ending)', function () {
        var hooray = new Hooray(1,2,3,4,5,6,7,8,9);

        var result = hooray.slice(2);

        expect(result).not.toBe(hooray);
        expect(result.length).toBe(7);
        expect(result).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(9);

        var chars = [3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(result[i]).toBe(chars[i]);

        var chars1 = [1,2,3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars1[i]);
    });

    it('should return a new empty array (from an empty array) from a beginning (no ending)', function () {
        var hooray = new Hooray(1,2,3,4,5,6,7,8,9);

        var result = hooray.slice(12);

        expect(result).not.toBe(hooray);
        expect(result.length).toBe(0);
        expect(result).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(9);

        var chars = [];
        for (var i = 0; i < chars.length; i++)
            expect(result[i]).toBe(chars[i]);

        var chars1 = [1,2,3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars1[i]);
    });


    it('should return a new array with the same values of the original array when no beginning and no ending', function () {
        var hooray = new Hooray(1,2,3,4,5,6,7,8,9);

        var result = hooray.slice();

        expect(result).not.toBe(hooray);
        expect(result.length).toBe(9);
        expect(result).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(9);

        var chars = [1,2,3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(result[i]).toBe(chars[i]);

        var chars1 = [1,2,3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars1[i]);
    });

    it('should return a new array with the last values of the original array when beginning is negative and no ending', function () {
        var hooray = new Hooray(1,2,3,4,5,6,7,8,9);

        var result = hooray.slice(-4);

        expect(result).not.toBe(hooray);
        expect(result.length).toBe(4);
        expect(result).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(9);

        var chars = [6, 7, 8, 9];
        for (var i = 0; i < chars.length; i++)
            expect(result[i]).toBe(chars[i]);

        var chars1 = [1,2,3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars1[i]);
    });

    it('should return a new array with values of the original array from the beginning and ending, both negatives', function () {
        var hooray = new Hooray(1,2,3,4,5,6,7,8,9);

        var result = hooray.slice(-7,-3);

        expect(result).not.toBe(hooray);
        expect(result.length).toBe(4);
        expect(result).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(9);

        var chars = [3, 4, 5, 6];
        for (var i = 0; i < chars.length; i++)
            expect(result[i]).toBe(chars[i]);

        var chars1 = [1,2,3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars1[i]);
    });

    it('should return a new array with no values when the beginning and ending are both negatives and ending < beginning', function () {
        var hooray = new Hooray(1,2,3,4,5,6,7,8,9);

        var result = hooray.slice(-3,-7);

        expect(result).not.toBe(hooray);
        expect(result.length).toBe(0);
        expect(result).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(9);

        var chars = [];
        for (var i = 0; i < chars.length; i++)
            expect(result[i]).toBe(chars[i]);

        var chars1 = [1,2,3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars1[i]);
    });

    it('should return a new array with values of the original array from the beginning and ending, begin < 0', function () {
        var hooray = new Hooray(1,2,3,4,5,6,7,8,9);

        var result = hooray.slice(-32,-7);

        expect(result).not.toBe(hooray);
        expect(result.length).toBe(2);
        expect(result).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(9);

        var chars = [1,2];
        for (var i = 0; i < chars.length; i++)
            expect(result[i]).toBe(chars[i]);

        var chars1 = [1,2,3,4,5,6,7,8,9];
        for (var i = 0; i < chars.length; i++)
            expect(hooray[i]).toBe(chars1[i]);

    });

}); 

describe('Hooray.prototype.some', function () {
    it('should create a table applying the expression', function () {
        var hooray = new Hooray(1,2,3,7);       

        var boleano = hooray.some(function(currentValue) { return currentValue > 6; });

        expect(boleano).toBe(true);

        expect(hooray).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(4);

    });


    it('should fail on undefined expression', function () {
        var hooray = new Hooray(1,2,3,7);
        var expression; // = console.log;

        expect(function() { hooray.some(expression); }).toThrowError(TypeError, 'undefined is not a function');
    });

    it('should fail on non-function expression', function () {
        var hooray = new Hooray(1,2,3,7);

        expect(function () { hooray.some(undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function() { hooray.some(true); }).toThrowError(TypeError, 'true is not a function');
        expect(function() { hooray.some(1); }).toThrowError(TypeError, '1 is not a function');
    });
});


describe('Hooray.prototype.unshift', function () {
    it('should insert a single item at the beginning of the array', function () {
        var hooray = new Hooray(1, 2, 3);
        
        hooray.unshift(0);

        expect(hooray).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(4);
               
        var expected = new Hooray(0, 1, 2, 3);
        expect(hooray).toEqual(expected);
    });

    it('should insert a multiple items at the beginning of the array', function () {
        var hooray = new Hooray(1, 2, 3);
        
        hooray.unshift(4,5,6);
        expect(hooray).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(6);
               
        var expected = new Hooray(4,5,6,1,2,3);
        expect(hooray).toEqual(expected);    
    });
});

  
describe('Hooray.prototype.splice', function() {
    it('should return a new hooray adding one element in the specific position', function() {
        var fellowship = new Hooray('Gandalf', 'Aragorn', 'Boromir', 'Gimli');
        var result = fellowship.splice(1, 0, 'Legolas');

        expect(result).not.toBe(fellowship);
        expect(fellowship[1]).toBe('Legolas');
        expect(fellowship).toContain('Gandalf', 'Legolas', 'Aragorn', 'Boromir', 'Gimli');
    });
    it('should return a new hooray adding more than one elements in the specific position', function() {
        var fellowship = new Hooray('Gandalf', 'Aragorn', 'Boromir', 'Gimli');
        var result = fellowship.splice(1, 0, 'Legolas','Dic');

        expect(result).not.toBe(fellowship);
        expect(fellowship[1],fellowship[2]).toBe('Legolas','Dic');
        expect(fellowship).toContain('Gandalf', 'Legolas','Dic', 'Aragorn', 'Boromir', 'Gimli');
    });
    it('should return a new empty hooray if no parameters are included', function() {
        var fellowship = new Hooray('Gandalf', 'Aragorn', 'Boromir', 'Gimli');
        var result = fellowship.splice();

        expect(result).not.toBe(fellowship);
        expect(result.length).toBe(0);
    });
    it('should return a new hooray with the elements eliminated from the original hooray', function() {
        var fellowship = new Hooray('Gandalf', 'Aragorn', 'Boromir', 'Gimli');
        var result = fellowship.splice(1, 2);

        expect(result).not.toBe(fellowship);
        expect(result.length).toBe(2);
        expect(result[0], result[1]).toBe('Aragorn', 'Boromir');
        expect(fellowship).toContain('Gandalf','Gimli')
        
       
    });

    it('should delete all elements after the index (index included)', function() {
        var fellowship = new Hooray('Gandalf', 'Aragorn', 'Boromir', 'Gimli');
        var result = fellowship.splice(1);

        expect(result).not.toBe(fellowship);
        expect(result.length).toBe(3);
        expect(result).toContain('Aragorn', 'Boromir', 'Gimli');
        expect(fellowship).toContain('Gandalf');     
    });

    it('should remove one element from index -2', function() {
        var fellowship = new Hooray('Gandalf', 'Aragorn', 'Boromir', 'Gimli');
        var result = fellowship.splice(-2,1);

        expect(result).not.toBe(fellowship);
        expect(result.length).toBe(1); 
        expect(fellowship.length).toBe(3);
        expect(result).toContain('Boromir');
        expect(fellowship).toContain('Gandalf', 'Aragorn', 'Gimli');     
    });
   
});

})