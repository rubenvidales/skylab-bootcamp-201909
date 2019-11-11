const express = require('express')
const { View, Landing, Register, Login, Search, Detail } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks, toggleFavDuck, retrieveDuck } = require('./logic')
// const logic = require('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')
const sessions = {}
const sessionRetriever = require('./helpers/middlewares/session-retriever')(sessions)

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

                sessions[id] = { token }

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

app.get('/search', cookieParser, sessionRetriever, (req, res) => {
    try {
        const { session, query: { q: query } } = req

        if (!session) return res.redirect('/')

        const { id, token } = session

        if (!token) return res.redirect('/')

        let name

        retrieveUser(id, token)
            .then(user => {
                name = user.name

                if (!query) return res.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))

                session.query = query
                session.view = 'search'

                return searchDucks(id, token, query)
                    .then(ducks => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', results: ducks, favPath: '/fav', detailPath: '/ducks' }) })))
            })
            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
    }
})

app.post('/logout', cookieParser, (req, res) => {
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    const { cookies: { id } } = req

    if (!id) return res.redirect('/')

    delete sessions[id]

    res.redirect('/')
})

app.post('/fav', cookieParser, sessionRetriever, bodyParser, (req, res) => {
    try {
        const { session, body: { id: duckId }, headers: { referer } } = req

        if (!session) return res.redirect('/')

        const { id, token, query } = session

        if (!token) return res.redirect('/')

        toggleFavDuck(id, token, duckId)
            .then(() => res.redirect(referer))
            .catch(({ message }) => {
                res.send('TODO error handling')
            })
    } catch ({ message }) {
        res.send('TODO error handling')
    }
})

app.get('/ducks/:id', cookieParser, sessionRetriever, (req, res) => {
    try {
        const { session, params: { id: duckId } } = req

        if (!session) return res.redirect('/')

        const { id, token, view, query } = session

        if (!token) return res.redirect('/')

        retrieveDuck(id, token, duckId)
            .then(duck =>
                res.send(View({ body: Detail({ item: duck, backPath: view === 'search'? `/search?q=${query}` : '/', favPath: '/fav' }) }))
            )
            .catch(({ message }) =>
                res.send('TODO error handling')
            )
    } catch ({ message }) {
        res.send('TODO error handling')
    }
})

app.listen(port, () => console.log(`server running on port ${port}`))

