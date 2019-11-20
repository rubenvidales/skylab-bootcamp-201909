// DEMO rest

function print(name, surname, ...data) {
    console.log(name, surname)

    data.forEach(data => console.log(data))
}

print('Xavi', 'Pruebalo', 'manzana', 'bollicao guapo', 'consola', 'debugger', 'patos')
// Xavi Pruebalo
// manzana
// bollicao guapo
// consola
// debugger
// patos

// DEMO spread object

const a = { x: 1, y: 2 }

const b = { ...a, z: 3 }

console.log(a, b)
// {x: 1, y: 2} {x: 1, y: 2, z: 3}

// DEMO spread array

const a = [1, 2]

const b = [...a, 3]

console.log(a, b)
// (2) [1, 2] (3) [1, 2, 3]

// DEMO spread array and object

const a = [1, 2]

const b = { ...a, 2: 3 }

console.log(a, b)
// [1, 2] {0: 1, 1: 2, 2: 3}

// DEMO spread object and array

const a = { 0: 1, 1: 2 }

const b = [...a, 3]

console.log(a, b)
// Uncaught TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
//    at <anonymous>:3:11

// DEMO spread object in function invocation

var a =  { x: 1, y: 2, z: 3 }

function print(x, y, z) { console.log('x', x, 'y', y, 'z', z) }

print(...a)
// Uncaught TypeError: Found non-callable @@iterator
//    at <anonymous>:5:1

// DEMO spread array in function invocation

var a =  [ 1, 2, 3 ]

function print(x, y, z) { console.log('x', x, 'y', y, 'z', z) }

print(...a)
// x 1 y 2 z 3