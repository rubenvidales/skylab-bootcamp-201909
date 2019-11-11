console.log('DEMO forEach');

var numbers = [1, 2, 3];

console.log('should print each number');

forEach(numbers, function(number) { console.log(number); });

console.log('should multiply each number by 10');

forEach(numbers, function(number) { console.log(number * 10); });

console.log('should express each number with a "is a number" string');

forEach(numbers, function(number) { console.log('this is number ' + number); });

console.log('should add all numbers in an external variable');

var result = 0;

forEach(numbers, function(number) { result += number; });

console.log(result);