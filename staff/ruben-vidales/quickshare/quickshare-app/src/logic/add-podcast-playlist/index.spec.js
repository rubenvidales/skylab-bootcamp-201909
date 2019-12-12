const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const addToPlaylist = require('.')
const { random } = Math
const { errors: { CredentialsError, NotFoundError } } = require('quickshare-util')
const { database, models: { User, RSSChannel, Podcast, Player } } = require('quickshare-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - add episodes to the users playlist', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, name, surname, email, username, password, rssId, rssTitle, rssUrl,
        podcastIds, podcastTitles, podcastUrls, podcastDurations, user

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        user = await new User({ name, surname, email, username, password, player: new Player() })
        id = user.id
        token = jwt.sign({ sub: id }, TEST_SECRET)

        rssTitle = `rss-title-${random()}`
        rssUrl = `www.rss-url-${random()}.com`

        const rss = await RSSChannel.create({ title: rssTitle, url: rssUrl })
        rssId = rss.id

        podcastIds = []
        podcastTitles = []
        podcastUrls = []
        podcastDurations = []

        const insertions = []
        for (let i = 0; i < 10; i++) {
            const _podcast = {
                title: `podcast-title-${random()}`,
                url: `www.podcast-url-${random()}.com`,
                rssChannel: rssId,
                duration: Math.floor(Math.random() * 1000) + 1
            }

            insertions.push(Podcast.create(_podcast).then(podcast => {
                podcastIds.push(podcast.id)
                user.favs.push(podcast.id)
            }))

            podcastTitles.push(_podcast.title)
            podcastUrls.push(_podcast.url)
            podcastDurations.push(_podcast.duration)
        }
        await Promise.all(insertions)

        await user.save()
    })

    it('should succeed on correct user and podcast data and the podcast is not in the playlist: empty playlist', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)];
        const result = await addToPlaylist(token, randomPodcast)

        expect(result).toBeDefined()
        expect(result).toBeType('array')
        expect(result.length).toEqual(1)
        expect(result[0].id).toEqual(randomPodcast)
    })

    it('should succeed on correct user and podcast data and the podcast is not in the playlist: playlist with other podcasts', async () => {
        user.player = { playlist: [podcastIds[0]] }
        await user.save()

        const result = await addToPlaylist(token, podcastIds[1])

        expect(result).toBeDefined()
        expect(result).toBeType('array')
        expect(result.length).toEqual(2)
        result.forEach(elem => {
            expect(podcastIds).toContain(elem.id)
        })
    })

    it('should succeed on correct user and podcast data and the podcast is in the playlist', async () => {
        user.player = { playlist: [podcastIds[1]] }
        await user.save()

        const result = await addToPlaylist(token, podcastIds[1])

        expect(result).toBeDefined()
        expect(result).toBeType('array')
        expect(result.length).toEqual(1)
        result.forEach(elem => {
            expect(podcastIds).toContain(elem.id)
        })
    })

    afterAll(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})