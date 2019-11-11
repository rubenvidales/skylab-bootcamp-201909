const http = require('http')

const { argv: [, , port = 8080] } = process

const server = http.createServer((req, res) => {
  const { method } = req

  if (method === 'POST') {
    let content = ''
    req.on('data', chunk => content += chunk)
    req.on('end', () => res.end(content.toUpperCase()))

  } else res.end('I only work with POST, buddy .P')
})

server.listen(port)

/*
// oficial solution:
     'use strict'
    const http = require('http')
    const map = require('through2-map') //prev install

    const server = http.createServer(function (req, res) {
      if (req.method !== 'POST') {
        return res.end('send me a POST\n')
      }

      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })

    server.listen(Number(process.argv[2]))
*/
