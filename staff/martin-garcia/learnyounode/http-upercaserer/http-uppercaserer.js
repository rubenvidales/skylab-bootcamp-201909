const { argv: [, , port] } = process
const map = require('through2-map')
const http = require('http')

const server = http.createServer((request, response) => {
    if (request.method !== 'POST') return response.end('only POST mate')

    request.pipe(map((chunk) => { return chunk.toString().toUpperCase() })).pipe(response)
})
server.on('error', error => { throw error })
server.listen(port)