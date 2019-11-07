const express = require('express')

const { View, Landing, Register, Login, Search } = require('./components')

const { registerUser, authenticateUser } = require('./logic')

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

app.post('/register', (req, res) => {
    let content = ''

    req.on('data', chuck => content += chuck)

    req.on('end', () => {
        const { name, surname, email, password } = querystring.parse(content)
        try {
            registerUser(name, surname, email, password, error => {
                if (error) res.send('error chungo!')
                //else res.send('depotamare')
                else res.redirect('/login')
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

    debugger

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

app.listen(port, () => console.log(`server running on port ${port}`))

