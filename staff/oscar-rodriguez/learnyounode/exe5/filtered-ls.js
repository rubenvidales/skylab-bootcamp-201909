const fs = require('fs')

fs.readdir(process.argv[2], 'utf8', (error,data)=>{
    if (error) return console.log(error)
    let result = data.filter(a=>{
        return a.includes(`.${process.argv[3]}`)
    })
    result.forEach(e=>{console.log(e)})
})