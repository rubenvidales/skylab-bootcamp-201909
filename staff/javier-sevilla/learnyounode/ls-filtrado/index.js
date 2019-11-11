const fs = require('fs')
fs.readdir(process.argv[2],(err, files) =>{
    if (err) throw err;

    const ext = '.' + process.argv[3]
    let result;
    for (let i = 0; i<files.length;i++){
        result = files[i].indexOf(ext);
        if (result > 0) {
            console.log(files[i])
        }
    }  
})
