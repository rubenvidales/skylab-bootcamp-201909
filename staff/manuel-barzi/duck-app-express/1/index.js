const express = require('express')
const View = require('./components/view')
const Landing = require('./components/landing')
const Register = require('./components/register')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const Login = require('./components/login')
const authenticateUser = require('./logic/authenticate-user')
const Search = require('./components/search')
const searchDucks = require('./logic/search-ducks')
const retrieveUser = require('./logic/retrieve-user')

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

app.post('/register', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const { name, surname, email, password } = querystring.parse(content)

        try {
            registerUser(name, surname, email, password, error => {
                if (error) return res.send('TODO error handling')

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
                if (error) return res.send('TODO error handling')

                const { id, token } = credentials

                sessions[id] = token

                //console.dir(sessions)

                res.setHeader('set-cookie', `id=${id}`)

                res.redirect('/search')
            })
        } catch (error) {
            // TODO handling
        }
    })
})

app.get('/search', (req, res) => {
    try {
        const { headers: { cookie } } = req

        if (!cookie) return res.redirect('/') 

        const [, id] = cookie.split('id=')

        const token = sessions[id]

        if (!token) return res.redirect('/')

        retrieveUser(id, token, (error, user) => {
            if (error) return res.send('TODO error handling')

            const { name } = user

            const { query: { q: query } } = req

            if (!query) res.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))
            else {
                try {
                    searchDucks(id, token, query, (error, ducks) => {
                        if (error) return res.send('TODO error handling')

                        console.log(ducks)

                        res.send(View({ body: `${Search({ path: '/search', query, name, logout: '/logout' })} ` })) // TODO ${Results({items: ducks})}
                    })
                } catch (error) {
                    // TODO handling
                    debugger
                }
            }
        })
    } catch (error) {
        // TODO handling
        res.send(':P')
    }
})

app.post('/logout', (req, res) => {
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    res.redirect('/')
})

app.listen(port, () => console.log(`server running on port ${port}`))

