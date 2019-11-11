const http = require ('http')
const map = require ('through2-map')

const server = http.createServer ((inStream,outStream)=> {
    
    inStream.pipe(map(chunk=>{
        return chunk.toString().toUpperCase()
    })).pipe(outStream)
})
server.listen(process.argv[2])