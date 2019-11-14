require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const users = require('./data/users')()
const { registerUser, authenticateUser, retrieveUser } = require('./logic')
const { ConflictError, CredentialsError, NotFoundError } = require('./utils/errors')
const jwt = require('jsonwebtoken')

const { JsonWebTokenError } = jwt

const api = express()

const jsonBodyParser = bodyParser.json()

const { argv: [, , port], env: { SECRET, PORT = port || 8080 } } = process

api.post('/users', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, password } } = req

    try {
        registerUser(name, surname, email, username, password)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

api.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })

                res.json({ token })
            })
            .catch(error => {
                const { message } = error

                if (error instanceof CredentialsError)
                    return res.status(401).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

api.get('/users', (req, res) => {
    const { headers: { authorization } } = req

    try {
        if (!authorization) throw new CredentialsError('no token provided')

        const [, token] = authorization.split(' ')

        const { sub: id } = jwt.verify(token, SECRET)

        retrieveUser(id)
            .then(user => res.json({ user })) // TODO token
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        if (error instanceof CredentialsError || error instanceof JsonWebTokenError)
            return res.status(401).json({ message })

        res.status(400).json({ message })
    }
})

users.load()
    .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))

