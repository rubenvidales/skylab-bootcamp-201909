const http = require('http')
const {argv:[,,url]}=process

http.get(url,response=>{
    response.setEncoding('utf8')
    response.on('error', error=>{throw error})
    let str = ''
    response.on('data', chunck=> {str +=chunck})
    response.on('end', ()=>{
        console.log(str.length)
        console.log(str)
    })
})