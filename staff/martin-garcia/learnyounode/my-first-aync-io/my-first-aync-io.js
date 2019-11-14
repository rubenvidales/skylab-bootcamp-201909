const fs = require('fs')
const { argv: [, , input] } = process
fs.readFile(input, (err, data) => {
    if (err) throw err
    else { console.log(data.toString().split('\n').length - 1) }
})