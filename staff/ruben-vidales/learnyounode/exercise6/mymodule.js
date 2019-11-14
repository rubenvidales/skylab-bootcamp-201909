const fs = require('fs')
const path = require('path')

module.exports = function (pathText, extension, callback) {
    fs.readdir(pathText, 'utf8', (error, data) => {
        if (error) return callback(error)
        const result = data.filter(line => path.extname(line) === '.' + extension);
        callback(undefined, result)
    })
}
