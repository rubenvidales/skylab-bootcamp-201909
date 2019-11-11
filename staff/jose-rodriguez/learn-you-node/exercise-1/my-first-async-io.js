
const fs = require('fs')
const {argv: [,,path]} = process
fs.readFile(path, function(err,data){
    if  (err) throw (err)
    console.log(data.toString().split('\n').length-1)

})

