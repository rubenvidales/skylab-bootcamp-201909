const http = require('http')
const { BufferList } = require('bl')
const bl = new BufferList()
const { argv } = process
http.get(argv[2], response => {
    response.setEncoding('utf8')
    response.on('data', (data) => { bl.append(data) })
    response.on('end', () => {
        console.log(bl.length)
        console.log(bl.toString())
    })
}).on('error', console.error)