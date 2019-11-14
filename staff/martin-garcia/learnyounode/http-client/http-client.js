const http = require('http')
const { argv } = process
http.get(argv[2], (response) => {
    response.on('data', (data) => { console.log(data.toString()) })
}).on('error', console.error)