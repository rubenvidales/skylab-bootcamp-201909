const list = require("./mymodule")

list(process.argv[2],process.argv[3],(err, files)=> {
    if (err) {
        console.log('error')
    } else {       
        files.forEach(element => {
            console.log(element)
        });
        
    }
})

