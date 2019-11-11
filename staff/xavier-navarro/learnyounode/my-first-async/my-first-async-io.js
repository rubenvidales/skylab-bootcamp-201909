const fs = require('fs')
const file = process.argv[2]
fs.readFile(file,(err, data) => {
    if (err) throw err;

    const lines = data.toString().split('\n').length-1    
    console.log(lines)
  })