const mod = require ('./mymodule')

mod(process.argv[2],process.argv[3], (error,files)=>{
    if (error) return console.error (error)
    files.forEach(file=>{
        console.log(file)
    })
})