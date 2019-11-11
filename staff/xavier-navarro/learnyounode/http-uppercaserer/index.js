const http = require('http')
const [,, port] = process.argv

const server = http.createServer((req, res) => {
    const { method } = req

    if (method === 'POST') {
        let content = ''

        req.on('data', chunk => content += chunk)
        req.on('end', () => res.end(content.toUpperCase()))

    } else res.end(`Method ${method} doesn't work`)
})

server.listen(port)