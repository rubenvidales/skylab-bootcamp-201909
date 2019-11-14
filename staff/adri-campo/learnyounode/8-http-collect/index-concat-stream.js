const http = require('http'),
    cs = require('concat-stream'),
    { argv: [, , url] } = process

const request = http.get(url, response => {
    response.on('error', error => { throw error })

    response.pipe(cs(content =>
        console.log(`${content.length}\n${content}`)
    ))
})

request.on('error', error => { throw error })