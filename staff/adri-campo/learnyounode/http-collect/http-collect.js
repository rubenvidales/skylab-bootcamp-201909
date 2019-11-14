const http = require('http')

const { argv: [, , url] } = process

const request = http.get(url, response => {
    response.setEncoding('utf8')

    response.on('error', error => { throw error })

    let content = ''

    response.on('data', chunk => content += chunk)

    response.on('end', () => console.log(`${content.length}\n${content}`))
})

request.on('error', error => { throw error })