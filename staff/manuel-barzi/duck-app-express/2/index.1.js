const express = require('express')
const { View, Landing, Register, Login, Search } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks } = require('./logic')
// const logic = require('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')

const { argv: [, , port = 8080] } = process

const sessions = {}

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

    try {
        registerUser(name, surname, email, password)
            .then(() => res.redirect('/'))
            .catch(({ message }) => res.send(View({ body: Register({ path: '/register', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Register({ path: '/register', error: message }) }))
    }
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', bodyParser, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(credentials => {
                const { id, token } = credentials

                sessions[id] = token

                //console.dir(sessions)

                res.setHeader('set-cookie', `id=${id}`)

                res.redirect('/search')
            })
            .catch(({ message }) => {
                res.send(View({ body: Login({ path: '/login', error: message }) }))
            })
    } catch ({ message }) {
        res.send(View({ body: Login({ path: '/login', error: message }) }))
    }
})

app.get('/search', cookieParser, (req, res) => {
    try {
        const { cookies: { id } } = req

        if (!id) return res.redirect('/')

        const token = sessions[id]

        if (!token) return res.redirect('/')

        retrieveUser(id, token)
            .then(user => {
                const { name } = user

                const { query: { q: query } } = req

                if (!query) res.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))
                else {
                    try {
                        searchDucks(id, token, query)
                            .then(ducks => {
                                if (error) return res.send('TODO error handling')

                                console.log(ducks)

                                res.send(View({ body: `${Search({ path: '/search', query, name, logout: '/logout' })} ` })) // TODO ${Results({items: ducks})}
                            })
                            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', name, logout: '/logout', error: message }) })))
                    } catch ({ message }) {
                        res.send(View({ body: Search({ path: '/search', name, logout: '/logout', error: message }) }))
                    }
                }
            })
            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', name, logout: '/logout', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', name, logout: '/logout', error: message }) }))
    }
})

app.post('/logout', cookieParser, (req, res) => {
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    const { cookies: { id } } = req

    if (!id) return res.redirect('/')

    delete sessions[id]

    res.redirect('/')
})

app.listen(port, () => console.log(`server running on port ${port}`))

