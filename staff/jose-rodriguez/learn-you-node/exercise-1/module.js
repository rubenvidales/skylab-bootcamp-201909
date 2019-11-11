const path = require('path')
const fs = require('fs')

module.exports = function (route, ext, callback) {
    
    fs.readdir(route, function(err,list){
        if  (err) return callback(err)
        else {
            result = list.filter(e => {
                return path.extname(e) === '.'+ext
        })
    } return callback(undefined, result)
    })
}