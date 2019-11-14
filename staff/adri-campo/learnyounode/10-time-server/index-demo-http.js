const net = require('net'),
    { argv: [, , port = 8080] } = process

const server = net.createServer(socket => {
    socket.setEncoding('utf8')

    socket.on('data', chunk => console.log(chunk))

    socket.end(`HTTP/1.1 204 OK
Content-Type: text/html
Access-Control-Allow-Origin: *`)
})

server.listen(port)
