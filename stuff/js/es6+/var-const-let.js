// DEMO -2

console.log(a)

var a = 1

// undefined

// DEMO -1

console.log(b)

const b = 1

// Uncaught ReferenceError: Cannot access 'b' before initialization
// at <anonymous>:1:13

// DEMO 0

console.log(c)

let c = 1

// Uncaught ReferenceError: Cannot access 'c' before initialization
// at <anonymous>:1:13

// DEMO 1

for (var i = 0; i < 10; i++)
	setTimeout(function() { console.log(i); }, 500);

console.log(i);
// 10
// 10 (10 times)

// DEMO 2

for (const i = 0; i < 10; i++)
	setTimeout(function() { console.log(i); }, 500);

console.log(i);
// Uncaught TypeError: Assignment to constant variable.
//    at <anonymous>:1:28
// 0

// DEMO 3

for (let i = 0; i < 10; i++)
	setTimeout(function() { console.log(i); }, 500);

console.log(i);
// Uncaught ReferenceError: i is not defined
//    at <anonymous>:4:13

// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9

// DEMO 4 var imitating let with a "selfie"

for (var i = 0; i < 10; i++)
	(function(i) {
		setTimeout(function() { console.log(i); }, 500);
    })(i);

console.log(i);
// 10

// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9

// DEMO 5

var a = 1; console.log(a);

(function() { var b = 2; console.log(b) ; })();

console.log(a, b);
// 1
// 2
// Uncaught ReferenceError: b is not defined
//    at <anonymous>:5:16

// DEMO 6

const a = 1; console.log(a);

{ const b = 2; console.log(b); }

console.log(a, b);
// 1
// 2
// Uncaught ReferenceError: b is not defined
//    at <anonymous>:5:16

// DEMO 7

let a = 1; console.log(a);

{ let b = 2; console.log(b); }

console.log(a, b);
// 1
// 2
// Uncaught ReferenceError: b is not defined
//    at <anonymous>:5:16

// DEMO 8

var a = 1; console.log(a);

{ var b = 2; console.log(b); }

console.log(a, b);
// 1
// 2
// 1 2