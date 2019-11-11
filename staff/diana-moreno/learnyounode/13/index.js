// Terminal 1:
// node index.js

// Terminal 2:
// curl "localhost:8080/api/parsetime?iso=2019-11-10T17:10:00.000Z"
// {"hour":18,"minute":10,"second":0}%
//
// curl "localhost:8080/api/unixtime?iso=2019-11-10T17:10:00.000Z"
// {"unixtime":1573405800000}%


const http = require('http'),
  nodeUrl = require('url')

const { argv: [, , port = 8080] } = process

const parseTimeHandler = (req, res, query) => {
  const iso = query.iso
  if (!iso) {
    res.end('Missing iso parameter')
  }
  const date = new Date(iso)
  const data = {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  }
  const json = JSON.stringify(data)

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(json) // {"hour":18,"minute":10,"second":0}%
}

const parseUnixHandler = (req, res, query) => {
  const iso = query.iso
  if (!iso) {
    res.end('Missing iso parameter')
  }
  const date = new Date(iso)
  const json = JSON.stringify({ unixtime: date.getTime() })

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(json) // {"unixtime":1573405800000}%
}

const router = (req, res) => {
  const { method, url } = req
  // construye un objeto url a partir de la url original
  // https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
  const urlObject = nodeUrl.parse(url, true)
  const pathname = urlObject.pathname

  if (method === 'GET' && pathname === '/api/parsetime') {
    parseTimeHandler(req, res, urlObject.query)
  } else if (method === 'GET' && pathname === '/api/unixtime') {
    parseUnixHandler(req, res, urlObject.query)
  }
  res.end(`Endpoint not found ${pathname}`)
}

const server = http.createServer(router)

server.listen(port, (error) => {
  if (error) {
    return console.log('something bad happened', error)
  }
  console.log('server running on port', port)
})
