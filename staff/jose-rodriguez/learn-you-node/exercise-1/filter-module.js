const filter = require('./module')

const {argv: [,,route,ext]} = process

filter(route,ext,(error, list) =>{
    if (error) return new Error(error)
    else {
        list.forEach(element => {
            console.log(element)
        });
    }
})