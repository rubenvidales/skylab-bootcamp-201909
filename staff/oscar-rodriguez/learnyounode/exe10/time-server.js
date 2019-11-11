const date = require ('strftime')

const net = require ('net')

const server = net.createServer( socket => {
    socket.write(`${date('%F %R', new Date())}\n`)
    socket.end()
})
server.listen(process.argv[2])
