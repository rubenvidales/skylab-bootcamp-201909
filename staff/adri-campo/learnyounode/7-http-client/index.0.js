const http = require('http')

const { argv: [, , url] } = process

http.get(url, response => {
    response.on('error', error => { throw error })

    response.on('data', chunk => console.log(chunk.toString()))
})