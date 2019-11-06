const express = require('express')
const View = require('./components/view')
const Landing = require('./components/landing')
const Register = require('./components/register')
const Login = require('./components/login')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register' }) }))
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register() }))
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login() }))
})

app.listen(port, () => console.log(`server running on port ${port}`))

