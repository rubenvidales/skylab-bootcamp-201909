const concat = require('concat-stream')
const http = require('http')

http.get (process.argv[2], (response) => {
        response.on('error', console.error)
        response.pipe(concat(data=>{
            console.log(data.length)
            console.log(data.toString())
        }))
}).on('error', console.error)