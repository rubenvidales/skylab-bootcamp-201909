const fs = require('fs')
const {argv: [,,path]} = process
let text = fs.readFileSync(path).toString()
let lines = text.split('\n').length-1

console.log(lines)