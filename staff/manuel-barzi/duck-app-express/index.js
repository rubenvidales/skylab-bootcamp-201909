const express = require('express')
const View = require('./components/view')
const Landing = require('./components/landing')
const Register = require('./components/register')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const Login = require('./components/login')
const authenticateUser = require('./logic/authenticate-user')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register({ path: '/register' }) }))
})

app.post('/register', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const { name, surname, email, password } = querystring.parse(content)

        try {
            registerUser(name, surname, email, password, error => {
                if (error) return res.send('error chungo!') // TODO

                res.redirect('/')
            })
        } catch (error) {
            // TODO handling
        }
    })
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const { email, password } = querystring.parse(content)

        try {
            authenticateUser(email, password, (error, credentials) => {
                if (error) return res.send('error chungo!') // TODO

                res.redirect('/search')
            })
        } catch (error) {
            // TODO handling
        }
    })
})

app.listen(port, () => console.log(`server running on port ${port}`))

