const express = require('express')
const querystring = require('querystring')
const { View, Landing, Register, Login, Search } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks } = require('./logic')
// const logic = require('./logic')

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

function parseBody(req, callback) {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const body = querystring.parse(content)

        callback(body)
    })
}

app.post('/register', (req, res) => {
    parseBody(req, body => {
        const { name, surname, email, password } = body

        try {
            registerUser(name, surname, email, password, error => {
                if (error) return res.send(View({ body: Register({ path: '/register', error: error.message }) }))

                res.redirect('/')
            })
        } catch (error) {
            res.send(View({ body: Register({ path: '/register', error: error.message }) }))
        }
    })
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', (req, res) => {
    parseBody(req, body => {
        const { email, password } = body

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

    const { headers: { cookie } } = req

    if (!cookie) return res.redirect('/')

    const [, id] = cookie.split('id=')

    console.log(sessions)

    delete sessions[id]

    console.log(sessions)

    res.redirect('/')
})

app.listen(port, () => console.log(`server running on port ${port}`))

