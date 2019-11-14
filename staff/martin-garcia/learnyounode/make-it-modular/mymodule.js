const fs = require('fs')
module.exports = (path, filter, callback) => {
    fs.readdir(path, (err, data) => {
        if (err) return callback(err)
        callback(undefined, data.filter(element => (element.length - element.lastIndexOf(`.${filter}`) === filter.length + 1) && element !== filter))
    })
}