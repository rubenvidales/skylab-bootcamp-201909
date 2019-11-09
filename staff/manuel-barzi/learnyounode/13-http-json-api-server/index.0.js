const http = require('http')

const { argv: [, , port = 8080] } = process

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method === 'GET') {
        const [ path, qs ] = url.split('?')

        if (path === '/api/parsetime') {
            if (qs.startsWith('iso=')) {
                const [, iso] = qs.split('=')

                const date = new Date(iso)

                const hour = date.getHours()
                const minute = date.getMinutes()
                const second = date.getSeconds()

                const json = JSON.stringify({ hour, minute, second })

                res.writeHead(200, { 'Content-Type': 'application/json' })

                res.end(json)
            } else res.end('Sorry, buddy, you have forgotten to send me the ISO date .P')
        } else if (path === '/api/unixtime') {
            if (qs.startsWith('iso=')) {
                const [, iso] = qs.split('=')

                const date = new Date(iso)

                const json = JSON.stringify({ unixtime: date.getTime() })

                res.writeHead(200, { 'Content-Type': 'application/json' })

                res.end(json)
            } else res.end('Sorry, buddy, you have forgotten to send me the ISO date .P')
        } else res.end('Sorry, buddy, I do not have this endpoint .P')

    } else res.end('I only work with GET, buddy .P')
})

server.listen(port)