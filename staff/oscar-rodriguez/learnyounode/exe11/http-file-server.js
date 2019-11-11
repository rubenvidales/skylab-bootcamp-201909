const fs = require('fs')
const http = require('http')

const server = http.createServer((req,res)=>{
    const read = fs.createReadStream(process.argv[3])
    read.on ('open', () => {
        read.pipe(res)
    })    
})
server.listen(process.argv[2])


/*****************************SYSTEM SOLUTION*******************************
 * 'use strict'
    const http = require('http')
    const fs = require('fs')
    
    const server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/plain' })
    
      fs.createReadStream(process.argv[3]).pipe(res)
    })
    
    server.listen(Number(process.argv[2]))
 */