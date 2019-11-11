'use strict'
const http = require('http')
let tabla = []
let counter = process.argv.length  - 2 
let url
for (let i = 2; i < process.argv.length; i++) {
    url = process.argv[i]
    http.get( url, (resp) => {
        let cadena = '';      
        resp.setEncoding('utf8');

        resp.on('data', (chunk) => {
            cadena += chunk
        })
        resp.on('end', () => {
            tabla[i-2] = cadena
            counter--
            if (counter === 0) {
               tabla.forEach((tab) =>{
                   console.log(tab)
               })
            }
        })
    })
}