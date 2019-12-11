const { Router } = require('express')
const { listRss, createRss, retrieveRss } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { ConflictError } } = require('quickshare-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.get('/:rssId',tokenVerifier, jsonBodyParser, (req, res) => {
    const { params: {rssId} } = req
    try {
        retrieveRss(rssId)
            .then(rss => res.status(201).json(rss))
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

router.get('/',tokenVerifier, jsonBodyParser, (req, res) => {
    const { id } = req

    try {
        listRss()
            .then(rss => res.status(201).json(rss))
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

router.post('/', tokenVerifier, jsonBodyParser, (req, res) => {
    const { id, body: { url } } = req

    try {
        createRss( id, url )
            .then(rssId => res.status(201).json(rssId))
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

module.exports = router