const fs = require('fs')
const path = require('path')

fs.readdir(process.argv[2], 'utf8', (error, data) => {
    if (error) throw error
    data.forEach((line) => {
        // It works if the file only have one dot
        //if (line.split('.')[1] == process.argv[3]) console.log (line)

        // It only works if the file have a dot
        // const res = line.split('.')
        // if (res[res.length-1] == process.argv[3]) console.log(line)
        if (path.extname(line) === '.'+process.argv[3]) console.log(line)
    })
})