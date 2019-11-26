const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('tasks-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.get('/', jsonBodyParser, (req, res) => {
    res.send('tests')
})

module.exports = router