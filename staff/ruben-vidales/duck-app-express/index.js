const express = require('express')

const { View, Landing, Register, Login, Search } = require('./components')
const { registerUser, authenticateUser } = require('./logic')

const { bodyParser, cookieParser } = require('./utils/middlewares')

const querystring = require('querystring')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register({ path: '/register' }) }))
})

app.post('/register', bodyParser, (req, res) => {
    const { body: { name, surname, email, password } } = req
debugger
    try {
        registerUser(name, surname, email, password)
            .then(() => res.redirect('/'))
            .catch(({ message }) => res.send(View({ body: Register({ path: '/register', error: message }) })))
    } catch (error) {
        res.send(View({ body: Register({ path: '/register', error: error.message }) }))
    }
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', (req, res) => {
    const { body: { email, password } } = req

    let content = ''

    req.on('data', chuck => content += chuck)

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

app.get('/search', (req, res) => {
    res.send(View({ body: Search({ path: '/search' }) }))
})

app.get('/logout', (req, res) => {
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    const { cookies: { id } } = req
    if (!id) return res.redirect('/')
    delete sessions[id]
    res.redirect('/')
})

app.listen(port, () => console.log(`server running on port ${port}`))

