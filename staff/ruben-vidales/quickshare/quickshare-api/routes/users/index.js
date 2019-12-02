const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, listUserFavs, toogleFavPodcast, listUserRss, modifyCurrentEpisode } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('quickshare-util')

const jsonBodyParser = bodyParser.json()

const router = Router()


router.post('/', jsonBodyParser, (req, res) => {
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

router.post('/auth', jsonBodyParser, (req, res) => {
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

router.get('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrieveUser(id)
            .then(user => res.json(user))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.get('/favs', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        listUserFavs(id)
            .then(user => res.json(user))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.post('/favs', tokenVerifier, jsonBodyParser, (req, res) => {
    const { id, body: { podcastId } } = req
    try {
        toogleFavPodcast(id, podcastId)
        .then(favs => res.json(favs))
        .catch(error => {
            const { message } = error

            if (error instanceof NotFoundError)
                return res.status(404).json({ message })

            res.status(500).json({ message })
        })

    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.get('/rss', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        listUserRss(id)
            .then(rss => res.json(rss))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.post('/player/current', tokenVerifier, jsonBodyParser, (req, res) => {
    const { id, body: { podcastId, position, active } } = req
    try {
        modifyCurrentEpisode(id, podcastId, position, active)
        .then(favs => res.json(favs))
        .catch(error => {
            const { message } = error

            if (error instanceof NotFoundError)
                return res.status(404).json({ message })

            res.status(500).json({ message })
        })

    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

module.exports = router