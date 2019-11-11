const fs = require ('fs')

fs.readFile(process.argv[2], 'utf8', (error, data) => { 
    data=data.split('\n')
    console.log(data.length-1)
})
