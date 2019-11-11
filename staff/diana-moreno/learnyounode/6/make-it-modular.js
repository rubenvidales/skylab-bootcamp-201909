const mymodule = require('./mymodule')

const { argv: [, , folder, extension] } = process

mymodule(folder, extension, (err, files) => {
  if (err) console.log(err)
  else {
    files.forEach(file => {
      console.log(file)
    })
  }
})
