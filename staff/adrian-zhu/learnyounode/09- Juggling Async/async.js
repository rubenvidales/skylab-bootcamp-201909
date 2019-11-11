const http = require('http')
const bl = require('bl') 

const urls = process.argv.splice(2).reverse()

let total = []
function httpGet(turn){
    if(turn<0){
        console.log(total.join('\n'))
        return
    }
    http.get(urls[turn],function(resp){
        resp.pipe(bl(function(err,data){
            if(err){
                console.error(`error:${err.message}`)
            }
            total.push( data+'' )
            httpGet(--turn)
        }))
    })
}
httpGet(2)