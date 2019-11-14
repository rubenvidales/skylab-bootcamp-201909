const { argv: [, , port] } = process
const map = require('through2-map')
const http = require('http')

const server = http.createServer((request, response) => {
    if (request.method !== 'GET') response.end('only GET mate')
    else {
        const url = request.url

        if (url.startsWith('/api/parsetime')) {
            const text = url.slice(url.indexOf('=') + 1, url.length)
            const time = {
                "hour": parseInt(text.slice(11, 13)) + 1,
                "minute": parseInt(text.slice(14, 16)),
                "second": parseInt(text.slice(17, 19))
            }
            response.end(JSON.stringify(time))

        } else if (url.startsWith('/api/unixtime')) {
            const text = url.slice(url.indexOf('=') + 1, url.length)
            const unix = { "unixtime": new Date(text).valueOf() }
            response.end(JSON.stringify(unix))

        } else response.end('wrong url mate')
    }
})

server.on('error', error => { throw error })
server.listen(port)