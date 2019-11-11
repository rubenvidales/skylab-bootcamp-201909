const http = require('http')
const {argv:[,,url]}= process

function callback(response) {
  response.setEncoding('utf8')
  response.on('error', error => {throw Error})
  response.on('data', chunk => {console.log(chunk)})
}

const req = http.get(url, callback)
req.on('error', error => {throw Error})
