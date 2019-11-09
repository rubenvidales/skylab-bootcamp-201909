const http = require('http')

// $ node index-promises-parallel-all http://google.com http://google.es http://google.it

const { argv: [, , ...urls] } = process

Promise.all(urls.map(url => new Promise((resolve, reject) => {
    const request = http.get(url, response => {
        response.setEncoding('utf8')

        response.on('error', error => reject(error))

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => resolve(content))
    })

    request.on('error', error => reject(error))
})))
    .then(contents => contents.forEach(content => console.log(content)))
    .catch(error => console.error(error.message))

