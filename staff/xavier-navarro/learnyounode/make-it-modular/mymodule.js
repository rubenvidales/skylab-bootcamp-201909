module.exports = readDirectories
const fs = require('fs')
const path = require('path')

function readDirectories(directoryName, extension, callback){
    fs.readdir(directoryName, (err, files) => {
        if(err) return callback(err)

        const result = files.filter(file => path.extname(file) === `.${extension}`)
        callback(undefined, result)
    })
}