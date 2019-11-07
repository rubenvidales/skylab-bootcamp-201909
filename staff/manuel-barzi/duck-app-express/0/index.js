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

let credentials

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
            authenticateUser(email, password, (error, _credentials) => {
                if (error) return res.send('TODO error handling')

                credentials = _credentials

                res.redirect('/search')
            })
        } catch (error) {
            // TODO handling
        }
    })
})

app.get('/search', (req, res) => {
    const { query: { q: query } } = req

    try {
        const { id, token } = credentials

        retrieveUser(id, token, (error, user) => {
            if (error) return res.send('TODO error handling')

            const { name } = user

            if (!query) res.send(View({ body: Search({ path: '/search', name }) }))
            else {
                try {
                    searchDucks(id, token, query, (error, ducks) => {
                        if (error) return res.send('TODO error handling')

                        console.log(ducks)

                        res.send(View({ body: `${Search({ path: '/search', query, name })} ` })) // TODO ${Results({items: ducks})}
                    })
                } catch (error) {
                    // TODO handling
                    debugger
                }
            }
        })
    } catch (error) {
        // TODO handling
        debugger
    }
})

app.listen(port, () => console.log(`server running on port ${port}`))

