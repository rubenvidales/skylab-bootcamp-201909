module.exports = function (folder, extension, callback) {
  const fs = require('fs')
  var path = require('path')
  fs.readdir(folder, (err, list) => {
    if(err) return callback(err, undefined)
    else {
      newList = list.filter(file => {
        const ext = path.extname(file)
        return ext === `.${extension}`
      })
      callback(undefined, newList)
    }
  })
}
