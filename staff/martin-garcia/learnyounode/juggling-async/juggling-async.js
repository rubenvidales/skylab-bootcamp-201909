const http = require('http')
const { argv: [, , ...urls] } = process
const auxArr = []
let count = 0
urls.forEach((url, index) => {
    http.get(url, response => {
        response.on('error', error => { throw error })
        let text = ''
        response.on('data', data => { text += data.toString() })
        response.on('end', () => {
            auxArr[index] = text;
            ++count === urls.length && auxArr.forEach(element => console.log(element))
        })
    }).on('error', console.error)
})