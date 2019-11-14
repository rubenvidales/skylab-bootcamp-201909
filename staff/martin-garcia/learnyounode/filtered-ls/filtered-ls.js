const fs = require('fs')
const { argv } = process
fs.readdir(argv[2], (err, data) => {
    if (err) throw err
    data.toString().split(',').forEach(element => {
        (element.includes(argv[3]) && element !== argv[3]) && console.log(element) })
})