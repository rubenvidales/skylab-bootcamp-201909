'use strict'
const http = require('http');
const url = process.argv[2]

http.get(url, (resp) => {
  let result = 0;
  let cadena = '';
  resp.setEncoding('utf8');
  
  resp.on('data', (chunk) =>{
     result += chunk.length
     cadena += chunk
  })
  
  resp.on('end', () => {
    console.log(result);
    console.log(cadena);
    
    })

})
