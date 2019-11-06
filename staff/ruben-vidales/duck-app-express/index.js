const express = require('express')
const Landing = require('./components/landing')
const Template = require('../../ruben-vidales/duck-app-express/helpers/template.js')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send( Template( Landing() ) )
})

app.listen(port, () => console.log(`server running on port ${port}`))

