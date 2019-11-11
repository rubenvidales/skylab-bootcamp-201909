
const fs = require('fs')
const path = require('path')


module.exports = function(dir, extFilter, callback){


    fs.readdir(dir, (error, list)=>{
        if(error) return callback(error)     
        const listFilted = list.filter((document) => {   
            return path.extname(document) === '.' + extFilter
            
        })

        callback(null, listFilted)
    })
}