
const fs = require('fs')
const path = require('path')

const {argv: [,,route,ext]} = process

fs.readdir(route, function(err,list){
    if  (err) throw new Error (err)
    list.forEach(e =>{
        if (path.extname(e) === '.'+ext)
        console.log(e)
    })
})
