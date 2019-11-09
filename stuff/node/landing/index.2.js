const salute = require('./salute')

// $ node . en Juanito

const { argv: [, , lang, name] } = process

console.log(salute(lang, name))


