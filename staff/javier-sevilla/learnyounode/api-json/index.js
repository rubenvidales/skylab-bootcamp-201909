const http = require('http'),
    url = require('url'),
    { argv: [, , port = 8080] } = process

const server = http.createServer((req, res) => {
    const { method } = req

    if (method === 'GET') {
        debugger

        const { pathname, query: { iso } } = url.parse(req.url, true)

        if (pathname === '/api/parsetime') {
            if (!iso) return res.end('Sorry, buddy, you have forgotten to send me the ISO date .P')

            const date = new Date(iso)

            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()

            const json = JSON.stringify({ hour, minute, second })

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(json)
        } else if (pathname === '/api/unixtime') {
            if (!iso) return res.end('Sorry, buddy, you have forgotten to send me the ISO date .P')

            const date = new Date(iso)

            const json = JSON.stringify({ unixtime: date.getTime() })

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(json)
        } else res.end('Sorry, buddy, I do not have this endpoint .P')

    } else res.end('I only work with GET, buddy .P')
})

server.listen(port)