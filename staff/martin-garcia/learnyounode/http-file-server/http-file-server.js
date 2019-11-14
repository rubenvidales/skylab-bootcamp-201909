const { argv: [, , port, filePath] } = process
const fs = require('fs')
const http = require('http')

const server = http.createServer((request, response) => {
    const rs = fs.createReadStream(filePath)
    rs.on('open', () => { rs.pipe(response) })
    rs.on('error', error => { throw error })
})

server.listen(port)
server.on('error', error => { throw error });