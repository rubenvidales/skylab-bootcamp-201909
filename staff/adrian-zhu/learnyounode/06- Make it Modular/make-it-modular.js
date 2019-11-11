var mymodule = require('./mymodule')

mymodule(process.argv[2], process.argv[3],(error, result) => {
  if (error) console.log(error)

  result.forEach((file) => console.log(file))
})