const http = require('http')

// $ node . http://google.com http://google.es http://google.it

const { argv: [, , ...urls] } = process

const outputs = []
let counter = 0

urls.forEach((url, index) => {
    const request = http.get(url, response => {
        response.setEncoding('utf8')

        response.on('error', error => { throw error })

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => {
            outputs[index] = content

            ++counter === urls.length && outputs.forEach(output => console.log(output))
        })
    })

    request.on('error', error => { throw error })
})

