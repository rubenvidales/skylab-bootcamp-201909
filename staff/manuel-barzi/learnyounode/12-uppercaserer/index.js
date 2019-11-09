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