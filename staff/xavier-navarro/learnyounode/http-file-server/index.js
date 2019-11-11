const fs = require('fs'), http = require('http')

const [,, port, file] = process.argv

const server = http.createServer((request, response) => {
    const rs = fs.createReadStream(file)

    response.writeHead(200, { 'content-type': 'text/plain' })

    rs.pipe(response)
})

server.listen(port)