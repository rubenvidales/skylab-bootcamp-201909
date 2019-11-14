const { argv: [, , port] } = process
const server = require('net').createServer(socket => {
    const date = new Date()
    socket.write(`${date.getFullYear()}-${date.getMonth() + 1}-${fillCeros( date.getDate())} ${fillCeros( date.getHours())}:${fillCeros(date.getMinutes())}\n`)
    socket.end()
})
server.on('error', (err) => { throw err })
server.listen(port)
fillCeros = (ele) => { return (ele < 10 ? '0' : '') + ele }