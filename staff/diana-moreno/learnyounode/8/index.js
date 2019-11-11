const http = require('http')
const { argv: [, , url] } = process

function callback(response) {
  response.setEncoding('utf8')
  response.on('error', error => { throw Error })
  let content = ''
  response.on('data', chunk => { content += chunk })
  response.on('end', () => {
    console.log(content.length)
    console.log(content)
  })
}

const req = http.get(url, callback)
req.on('error', error => { throw Error })

// install bl with: npm i bl

/*
Oficial solution

'use strict'
const http = require('http')
const bl = require('bl')

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err) {
      return console.error(err)
    }
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})
*/
