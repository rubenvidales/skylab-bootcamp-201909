// $ node cp hello-world.txt hello-world-2.txt
// WHAT if file is big (2GB file, $ mkfile 2G big-file)
// $ node cp big-file big-file-2

const fs = require('fs')

const { argv: [, , from, to] } = process

console.log(process.memoryUsage())

fs.readFile(from, /*'utf8',*/ (error, content) => { // WHAT if file is an image, does 'utf8' have sense? try with skylab-icon.png
    if (error) throw error

    console.log(process.memoryUsage())

    fs.writeFile(to, content, error => {
        if (error) throw error

        console.log(process.memoryUsage())
    })
})