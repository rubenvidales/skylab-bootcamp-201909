const http = require('http'),
    bl = require('bl'),
    { argv: [, , url] } = process/*,
    fs = require('fs')*/

const request = http.get(url, response => {
    //response.pipe(fs.createWriteStream('content.txt'))

    response.pipe(bl((error, content) => {
        if (error) throw error

        console.log(`${content.length}\n${content}`)
    }))
})

request.on('error', error => { throw error })