const http = require('http')

const { argv: [, , url] } = process

const request = http.get(url, response => {
    response.setEncoding('utf8')

    response.on('error', error => { throw error })

    response.on('data', chunk => console.log(chunk))

    // let counter = 0
    // response.on('data', chunk => {console.log(chunk); counter++})
    // response.on('end', () => console.log(counter))
})

request.on('error', error => { throw error })