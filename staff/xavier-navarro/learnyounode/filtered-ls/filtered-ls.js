const fs = require('fs')
const path = require('path')
const dir = process.argv[2]

fs.readdir(dir, (err, files) => {
   const result = files.filter(file => path.extname(file) === '.md')
   result.forEach(file => {
       console.log(file)
   })
})