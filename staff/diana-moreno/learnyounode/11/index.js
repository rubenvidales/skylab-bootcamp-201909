const fs = require('fs'),
  http = require('http')

const { argv: [, , port, file] } = process

const server = http.createServer((request, response) => {
  const rs = fs.createReadStream(file)

  response.writeHead(200, { 'content-type': 'text/plain' })
  // response.writeHead(200, {
  //     'content-type': 'text/html',
  //     'Access-Control-Allow-Origin': '*'
  // })

  rs.pipe(response)
})

server.listen(port)
