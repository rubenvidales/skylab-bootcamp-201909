const http = require('http')
let req1 = '', req2 = '', req3 = ''
http.get(process.argv[2], (resp) => {
    resp.setEncoding('utf8')
    resp.on('data', (chunk) => { req1 += chunk; })
    resp.on('end', () => {
        try {
            console.log(req1)
            http.get(process.argv[3], (resp2) => {
                resp2.setEncoding('utf8')
                resp2.on('data', (chunk) => { req2 += chunk; })
                resp2.on('end', () => {
                    try {
                        console.log(req2)
                        http.get(process.argv[4], (resp3) => {
                            resp3.setEncoding('utf8')
                            resp3.on('data', (chunk) => { req3 += chunk; })
                            resp3.on('end', () => {
                                try {
                                    console.log(req3)
                                } catch (e) {
                                    console.error(e.message)
                                }
                            })
                        })
                    } catch (e) {
                        console.error(e.message)
                    }
                })
            })
        } catch (e) {
            console.error(e.message)
        }
    })
})

//Respuesta oficial
/* 
const http = require('http')
const bl = require('bl')
const results = []
let count = 0

function printResults() {
    for (let i = 0; i < 3; i++) {
        console.log(results[i])
    }
}

function httpGet(index) {
    http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
            if (err) {
                return console.error(err)
            }

            results[index] = data.toString()
            count++

            if (count === 3) {
                printResults()
            }
        }))
    })
}

for (let i = 0; i < 3; i++) {
    httpGet(i)
} 
*/
