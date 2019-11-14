const fs = require('fs')
var str = process.argv[2]
fs.readFile(str, 'utf8', function (err, data) {
    if(err) throw (error)
    console.log(data.split('\n').length - 1)   
})