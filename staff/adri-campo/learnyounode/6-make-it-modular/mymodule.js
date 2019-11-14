var filterList = require("./make-it-modular.js")
var dir = process.argv[2]
var ext = process.argv[3]
filterList(dir, ext, function (err, list) {
    if (err)
      return console.error(err)
      list.forEach(function (file) {
        console.log(file)
      })
})