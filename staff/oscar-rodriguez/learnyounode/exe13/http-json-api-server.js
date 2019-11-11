const http = require('http')
const url = require('url')

const server = http.createServer ((req,res)=>{
    const {method} = req
    
    if (method === 'GET') {
        const reqUrl = url.parse(req.url)
        const iso = reqUrl.query.split('=')[1]

        if (reqUrl.query.split('=')[0]==='iso'){
            const date = new Date (iso)
            if (reqUrl.pathname === '/api/unixtime') {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({'unixtime' : date.getTime()}))

            } else if (reqUrl.pathname === '/api/parsetime'){
                const hour = date.getHours()
                const minute = date.getMinutes()
                const second = date.getSeconds()

                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({hour, minute, second}))
            }
        } else res.end ("Sorry, there's no iso")
    } else res.end ("Sorry, i only work on GET methods")
})
server.listen(process.argv[2])