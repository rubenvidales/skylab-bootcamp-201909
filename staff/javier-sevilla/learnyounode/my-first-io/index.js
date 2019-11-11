const fs = require('fs')
const result = fs.readFileSync(process.argv[2]).toString()
const cadena = result.split('\n')
console.log(cadena.length - 1)
