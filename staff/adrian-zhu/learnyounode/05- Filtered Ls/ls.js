const fs = require('fs')
const path = require('path')

fs.readdir(process.argv[2], (error, list)=>{
    if(error) return error;
    list.forEach((document) => {
        
        if(path.extname(document) === '.' + process.argv[3])
        console.log(document)
    })
})