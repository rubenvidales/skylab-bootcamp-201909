const net = require('net'),
  { argv: [, , port = 8080] } = process

const server = net.createServer(socket => {
  const date = new Date,
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hours = date.getHours(),
    minutes = date.getMinutes()

  socket.end(`${year}-${d2(month)}-${d2(day)} ${d2(hours)}:${d2(minutes)}\n`)
})

function d2(num) {
  return num < 10 ? `0${num}` : num
}

server.listen(port)

// end send something and finish the conexion. Write only sends but not closes the conexion (socket.write(data) vs socket.end(data))
