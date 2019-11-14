const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const users = require('./data/users')()
const { registerUser, authenticateUser, retrieveUser } = require('./logic')
const { ConflictError, CredentialsError, NotFoundError } = require('./utils/errors')

const api = express()

const jsonBodyParser = bodyParser.json()

const { argv: [, , port = 8080] } = process

api.post('/users', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, password } } = req

    try {
        registerUser(name, surname, email, username, password)
            .then(() => res.json({ message: 'user registered successfully' }))
            .catch(error => {
                if (error instanceof ConflictError)
                    return res.status(409).json({ message: error.message })

                res.status(500).json({ message: error.message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

api.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password)
            .then(id => res.json({ message: 'user authenticated successfully', id })) // TODO token
            .catch(error => {
                if (error instanceof NotFoundError)
                    return res.status(404).json({ message: error.message })

                res.status(500).json({ message: error.message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

api.get('/users/:id', (req, res) => {
    const { params: { id }} = req

    try {
        retrieveUser(id)
            .then(user => res.json({ message: 'user retrieved successfully', user })) // TODO token
            .catch(error => {
                if (error instanceof CredentialsError)
                    return res.status(401).json({ message: error.message })

                res.status(500).json({ message: error.message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

users.load()
    .then(() => api.listen(port, () => console.log(`${name} ${version} up and running on port ${port}`)))

