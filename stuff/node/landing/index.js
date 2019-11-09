const HJSON = require('hybrid-json')

// $ node . 3000 en Juanito

const { argv: [, , name] } = process

//console.log(JSON.parse(`{"name": "${name}""}`)) // OK
//console.log(JSON.parse(`{"name": '${name}'}`)) // KO cannot parse a json with simple quotes
console.log(HJSON.parse(`{"name": '${name}'}`)) // OK now yes


