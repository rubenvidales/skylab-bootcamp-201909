const { Router } = require('express')
const { createPodcast, listPodcastsByRss, retrievePodcast } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('quickshare-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.get('/:podcastId', tokenVerifier,jsonBodyParser, (req, res) => {
    try {
        const { params: {podcastId} } = req

        retrievePodcast(podcastId)
            .then(podcast => res.json(podcast))
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

router.get('/rss/:rssId', tokenVerifier,jsonBodyParser, (req, res) => {
    try {
        const { params: {rssId} } = req

        listPodcastsByRss(rssId)
            .then(podcasts => res.json(podcasts))
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

router.post('/', tokenVerifier, jsonBodyParser, (req, res) => {
    const { body: { title, url, rssId, description, publicationDate, duration } } = req

    try {
        createPodcast( title, url, rssId, description, publicationDate, duration )
            .then(podcastId => res.status(201).json(podcastId))
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