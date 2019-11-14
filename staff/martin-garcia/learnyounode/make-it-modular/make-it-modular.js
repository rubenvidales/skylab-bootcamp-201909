const { argv } = process
const mymodule = require('./mymodule.js')
mymodule(argv[2], argv[3], (err, data) => {
    if (err) throw err
    data.forEach(element => { console.log(element) });
})