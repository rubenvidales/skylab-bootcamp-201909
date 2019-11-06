const express = require('express')

const querystring = require('querystring')

const View = require('./components/view')
const Landing = require('./components/landing')
const Register = require('./components/register')
const Login = require('./components/login')
const registerUser = require('./logic/register-user')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register' }) }))
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register() }))
})

app.post('/register', (req, res) => {
    let content = ''

    req.on('data', chuck => content += chuck)

    req.on('end', () => {
        const { name, surname, email, password } = querystring.parse(content)
        try {
            registerUser(name, surname, email, password, error => {
                if (error) res.send('error chungo!')
                else res.send('depotamare')
            })
        } catch (error) {
            // TODO handling
        }

    })
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login() }))
})

app.post('/login', (req, res) => {
    let content = ''

    req.on('data', chuck => content += chuck)

    req.on('end', () => {
        const { email, password } = querystring.parse(content)
        try {
            
        } catch (error) {

        }

    })
})

app.listen(port, () => console.log(`server running on port ${port}`))

