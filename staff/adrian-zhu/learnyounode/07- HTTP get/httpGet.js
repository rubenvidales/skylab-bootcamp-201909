const http = require('http')

http.get(process.argv[2], function (response) {
    response.setEncoding('utf8') // transform varibale in utf8
    response.on('data', console.log) // on => bind an event to the object => itś like if 
    response.on('error', console.error)
  }).on('error', console.error)
