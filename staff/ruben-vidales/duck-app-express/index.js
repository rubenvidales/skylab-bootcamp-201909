const express = require('express')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {

})

app.listen(port, ()=> console.log(`Server running on port ${port}`))