const http = require('http')

// $ node index-promises-series-for-each http://google.com http://google.es http://google.it

const { argv: [, , ...urls] } = process

let chain = Promise.resolve()

urls.forEach(url => {
    chain = chain.then(() => new Promise((resolve, reject) => {
        const request = http.get(url, response => {
            response.setEncoding('utf8')

            response.on('error', error => reject(error))

            let content = ''

            response.on('data', chunk => content += chunk)

            response.on('end', () => resolve(content))
        })

        request.on('error', error => reject(error))
    }).then(console.log))
})

