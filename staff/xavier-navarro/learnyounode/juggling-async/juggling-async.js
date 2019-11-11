const [,,...urls] = process.argv
const http = require('http')
const bl = require('bl')
let results = []
let count = 0

urls.forEach(doRequest)

function doRequest (url, index) {
    let result = ''
    http.get(url, (res) => {
    res.setEncoding('utf8')
    res.on('data', (data) => {
        result += data
    })
    res.on('end', () => {
        results[index] = result
        count++
        if (count === urls.length) results.forEach((item) => console.log(item))
    })
    res.on('error', (err) => console.error(err))
    })
}