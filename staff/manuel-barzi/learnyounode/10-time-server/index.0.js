const net = require('net'),
    strftime = require('strftime'),
    { argv: [, , port = 8080] } = process

const server = net.createServer(socket => {
    const date = strftime('%F %R', new Date)

    socket.end(`${date}\n`)
})

function d2(num) {
    return num < 10 ? `0${num}` : num
}

server.listen(port)
