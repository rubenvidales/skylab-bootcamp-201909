const fs = require('fs')

const buffer = fs.readFileSync(process.argv[2])

const str = buffer.toString()

const lines = str.split('\n')

console.log(lines.length-1)
