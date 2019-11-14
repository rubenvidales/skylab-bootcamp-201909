const http = require('http')
http.get(process.argv[2], (resp) => {
    resp.setEncoding('utf8')
    let result = '';
    resp.on('data', (chunk) => { result += chunk; })
    resp.on('end', () => {
        try {
            console.log(result.length)
            console.log(result)
        } catch (e) {
            console.error(e.message)
        }
    })
})