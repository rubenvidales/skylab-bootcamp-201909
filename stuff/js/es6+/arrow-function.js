// DEMO 1

[1, 2, 3].forEach(v => console.log(v))
// 1
// 2
// 3

// DEMO 2
[1, 2, 3].forEach((v, i) => console.log(v, i))
// 1 0
// 2 1
// 3 2

// DEMO 3

var person = {
    favs: ['apple', 'swimming', 'pizza', 'sleep', 'read'],

    print: function () { this.favs.forEach(fav => console.log(fav)) }
}

person.print()
// apple
// swimming
// pizza
// sleep
// read

// DEMO 3.1

var person = {
    favs: ['apple', 'swimming', 'pizza', 'sleep', 'read'],

    print: () => { this.favs.forEach(fav => console.log(fav)) }
}

person.print()
// Uncaught TypeError: Cannot read property 'forEach' of undefined
//    at Object.print (<anonymous>:4:30)
//    at <anonymous>:7:8

// DEMO 3.2 same as before

var person = {
    favs: ['apple', 'swimming', 'pizza', 'sleep', 'read'],

    print: function () { this.favs.forEach(fav => console.log(fav)) }.bind(this)
}

person.print()
// Uncaught TypeError: Cannot read property 'forEach' of undefined
//    at <anonymous>:4:36
//    at <anonymous>:7:8

// DEMO 4

var person = {
    name: 'Pepito',

    favs: ['apple', 'swimming', 'pizza', 'sleep', 'read'],

    print: function () { this.favs.forEach(fav => console.log(this.name, fav)) }
}

person.print()
// Pepito apple
// Pepito swimming
// Pepito pizza
// Pepito sleep
// Pepito read

// DEMO 5

var person = {
    name: 'Pepito',

    favs: ['apple', 'swimming', 'pizza', 'sleep', 'read'],

    print: function () { this.favs.forEach(function (fav) { console.log(this.name, fav) }.bind(this)) }
}

person.print()
// Pepito apple
// Pepito swimming
// Pepito pizza
// Pepito sleep
// Pepito read

// DEMO 6 no binding, then this points to window

var person = {
    name: 'Pepito',

    favs: ['apple', 'swimming', 'pizza', 'sleep', 'read'],

    print: function () { this.favs.forEach(function (fav) { console.log(this.name, fav) }) }
}

person.print()
//  apple
//  swimming
//  pizza
//  sleep
//  read