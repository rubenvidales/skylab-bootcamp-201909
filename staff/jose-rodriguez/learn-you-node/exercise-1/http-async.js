const http = require('http')
const { argv: [,,...urls] } = process

let results = []
let counter = 0

urls.forEach((url, index) => {
    const request = http.get(url, response => {
        response.setEncoding('utf8')
        response.on('error', error => { throw error })

        let content = ''
        response.on('data', chunk => content += chunk)
        response.on('end', () => {
            results[index] = content
            ++counter === urls.length && results.forEach(result => console.log(result))
        })
    })
    request.on('error', error => { throw error })
})


