const http = require('http')

const { argv: [, , port] } = process

const server = http.createServer((req, resp) => {
    const { method, url } = req
    if (method == 'GET') {
        const [path, query] = url.split('?')
        if (path == '/api/parsetime') {
            if (query.startsWith('iso=')) {
                const [, iso] = query.split('=')
                const date = new Date(iso)
                const hour = date.getHours()
                const minute = date.getMinutes()
                const second = date.getSeconds()

                const json = JSON.stringify({ hour, minute, second })

                resp.writeHead(200, { 'Content-Type': 'application/json' })
                resp.end(json)
            }
            else resp.end('No query detected')
        }
        else if (path == '/api/unixtime') {
            if (query.startsWith('iso=')) {
                const [, iso] = query.split('=')
                const date = new Date(iso)

                const json = JSON.stringify({ unixtime: date.getTime() })

                resp.writeHead(200, { 'Content-Type': 'application/json' })
                resp.end(json)
            }
            else resp.end('No query detected')
        }
        else resp.end('Incorrect endpoint')
    } else resp.end('Only works with GET calls')
})
server.listen(port)


//learnyounode proposal
/* 
'use strict'
const http = require('http')

function parsetime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}

function unixtime(time) {
    return { unixtime: time.getTime() }
}

const server = http.createServer(function (req, res) {
    const parsedUrl = new URL(req.url, 'http://example.com')
    const time = new Date(parsedUrl.searchParams.get('iso'))
    let result

    if (/^\/api\/parsetime/.test(req.url)) {
        result = parsetime(time)
    } else if (/^\/api\/unixtime/.test(req.url)) {
        result = unixtime(time)
    }

    if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
    } else {
        res.writeHead(404)
        res.end()
    }
})
server.listen(Number(process.argv[2]))
 */