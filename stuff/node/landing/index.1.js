const fs = require('fs')

// $ node . Juanito

const { argv: [, , name] } = process

//fs.writeFileSync(`hello-${name.toLowerCase()}.txt`, `Hello, ${name}!`)

fs.writeFile(`hello-${name.toLowerCase()}.txt`, `Hello, ${name}!`, error => {
    if (error) throw error

    console.log('file written')
})

console.log('hello')

