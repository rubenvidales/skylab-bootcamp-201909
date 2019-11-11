const filter = require('./mymodule')
const dir = process.argv[2]
const ext = 'md'

filter(dir, ext, (err, files) => {
    if(err) throw err

    files.forEach(file => {
        console.log(file)
    });
})