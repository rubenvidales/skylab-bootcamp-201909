const http = require('http')

http.get (process.argv[2], (response) => {
        response.setEncoding('utf8')
        response.on('error', console.error)
        response.on('data', console.log)
}).on('error', console.error)