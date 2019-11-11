var fs = require('fs'); // coger el modulo
var result = fs.readFileSync(process.argv[2], 'utf-8'); // escoger el metodo
console.log(result.split('\n').length-1);