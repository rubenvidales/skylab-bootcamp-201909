// DEMO

const p = [1, 2, 3]

const [x, y, z] = p

console.log(x, y, z)
// 1 2 3

// DEMO

const p = { x: 1, y: 2, z: 3 }

const { x, y, z } = p

console.log(x, y, z)
// 1 2 3

// DEMO swapping values

let [a, b] = [1, 2];

[a, b] = [b, a];

console.log(a, b)
// 2 1

// DEMO

let [a, , , , b] = [1, 2, 3, 4, 5];

[a, b] = [b, a];

console.log(a, b)
// 5 1

// DEMO

let [a, , , , b] = [1, 2, 3, 4, 5];

[a, b] = [b, a];

console.log(a, b)
// 5 1

// DEMO xungo

const o = {
    a: {
        b: {
            c: {
                d: [
                    0,
                    {
                        e: [
                            1, 2, 3, {
                                f: function () {
                                    console.log('hola mundo')
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
}

const { a: { b: { c: { d: [, { e: [, , , { f: hello }] }] } } } } = o

hello()
// hola mundo