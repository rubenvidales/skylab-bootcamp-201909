module.exports = function readDir (dir, ext, callback) {
    const fs = require ('fs')
    const path = require('path')

    let list = []

    fs.readdir(dir, 'utf8', (err, files) => {
        if (err) return callback(err)
        files.forEach(file=>{
            if(path.extname(file) === `.${ext}`){
                list.push(file)
            }
        })
        callback(undefined, list)
    })
}