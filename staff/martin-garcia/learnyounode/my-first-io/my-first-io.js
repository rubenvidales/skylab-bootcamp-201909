const fs = require('fs')
const { argv: [, , input] } = process
console.log(fs.readFileSync(input).toString().split('\n').length - 1)