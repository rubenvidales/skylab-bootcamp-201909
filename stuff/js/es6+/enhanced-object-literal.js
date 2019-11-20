// DEMO

let a = 1, b = 2

const o = { a, b }

console.log(o)

a = 2

console.log(o)
// {a: 1, b: 2}
// {a: 1, b: 2}

// DEMO

const o = { salute(name) { console.log(`hello, ${name}`) } }

o.salute('Pepito')
// hello, Pepito