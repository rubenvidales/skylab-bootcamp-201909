const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, createRss } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('quickshare-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.get('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req
        /*
        retrieveUser(id)
            .then(user => res.json(user))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
        */    
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

module.exports = router