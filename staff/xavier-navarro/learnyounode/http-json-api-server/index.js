const   http = require('http'),
        url = require('url'),
    [,, port = 8080] = process.argv

const server = http.createServer((req, res) => {
    const { method } = req
    switch (method) {
        case 'GET':
            const { pathname, query: { iso } } = url.parse(req.url, true)

            if (pathname === '/api/parsetime') {
                if (!iso) return res.end('Error, ISO date not found')
    
                const date = new Date(iso)
                const hour = date.getHours()
                const minute = date.getMinutes()
                const second = date.getSeconds()
    
                const json = JSON.stringify({ hour, minute, second })
    
                res.writeHead(200, { 'Content-Type': 'application/json' })
    
                res.end(json)
            } else if (pathname === '/api/unixtime') {
                if (!iso) return res.end('Error, ISO date not found')
    
                const date = new Date(iso)
    
                const json = JSON.stringify({ unixtime: date.getTime() })
    
                res.writeHead(200, { 'Content-Type': 'application/json' })
    
                res.end(json)
            } else res.end('Error, bad endpoint')
            break;
    
        default:
                res.end('Invalid method')
            break;
    }
})

server.listen(port)