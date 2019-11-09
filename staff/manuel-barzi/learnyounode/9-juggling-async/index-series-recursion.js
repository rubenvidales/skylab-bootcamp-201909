const http = require('http')

// $ node index-series-recursion http://google.com http://google.es http://google.it

const { argv: [, , ...urls] } = process;

(function retrieve(urls) {
    if (urls.length) {
        const request = http.get(urls[0], response => {
            response.setEncoding('utf8')
        
            response.on('error', error => { throw error })
        
            let content = ''
        
            response.on('data', chunk => content += chunk)
        
            response.on('end', () => {
                console.log(content)
    
                retrieve(urls.slice(1))
            })
        })
        
        request.on('error', error => { throw error })
    }
})(urls)

