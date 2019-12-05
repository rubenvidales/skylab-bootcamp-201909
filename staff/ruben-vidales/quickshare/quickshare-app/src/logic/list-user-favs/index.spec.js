const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const listUserFavs = require('.')
const { random } = Math
const { errors: { CredentialsError, NotFoundError } } = require('quickshare-util')
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - list favs', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, name, surname, email, username, password, rssId, rssTitle, rssUrl,
        podcastIds, podcastTitles, podcastUrls, podcastDurations 

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        const user = await new User({ name, surname, email, username, password })
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

    it('should succeed on correct user', async () => {

        const podcasts = await listUserFavs(token)

        expect(podcasts).toBeDefined()
        expect(podcasts).toHaveLength(10)

        podcasts.forEach(podcast => {
            expect(podcast.id).toBeDefined()
            expect(podcast.id).toBeOfType('string')
            expect(podcast.id).toHaveLengthGreaterThan(0)
            expect(podcast.id).toBeOneOf(podcastIds)

            expect(podcast.title).toBeDefined()
            expect(podcast.title).toBeOfType('string')
            expect(podcast.title).toHaveLengthGreaterThan(0)
            expect(podcast.title).toBeOneOf(podcastTitles)

            expect(podcast.url).toBeDefined()
            expect(podcast.url).toBeOfType('string')
            expect(podcast.url).toHaveLengthGreaterThan(0)
            expect(podcast.url).toBeOneOf(podcastUrls)

            expect(podcast.duration).toBeDefined()
            expect(podcast.duration).toBeOfType('number')
            expect(podcast.duration).toBeGreaterThan(0)
            expect(podcast.duration).toBeOneOf(podcastDurations)
        })
    })

    afterAll(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
