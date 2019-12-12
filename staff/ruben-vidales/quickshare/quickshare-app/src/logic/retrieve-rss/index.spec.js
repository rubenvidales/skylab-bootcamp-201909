const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const retrieveRss = require('.')
const { random } = Math
const { errors: { CredentialsError, NotFoundError } } = require('quickshare-util')
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - retrieve rss', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, name, surname, email, username, password, rssIds, rssTitles, rssUrls

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

        rssIds = []
        rssTitles = []
        rssUrls = []

        const insertions = []
        for (let i = 0; i < 10; i++) {
            const _rss = {
                title: `rss-title-${random()}`,
                url: `www.rss-url-${random()}.com`
            }
            insertions.push(RSSChannel.create(_rss).then(rss => {
                rssIds.push(rss.id)
                rssTitles.push(rss.title)
                rssUrls.push(rss.url)
                user.rssChannels.push(rss.id)
            }))
        }

        await Promise.all(insertions)

        await user.save()
    })

    it('should succeed on correct rss id', async () => {

        const randomRssId = rssIds[Math.floor(Math.random() * rssIds.length)];

        const rss = await retrieveRss(token, randomRssId)
        expect(rss).toBeDefined()

        expect(rss.id).toEqual(randomRssId)
        expect(rss.id).toBeOfType('string')
        expect(rss._id).toBeUndefined()

        expect(rss.title).toBeOfType('string')
        expect(rss.title).toBeOneOf(rssTitles)

        expect(rss.url).toBeOfType('string')
        expect(rss.url).toBeOneOf(rssUrls)

    })

    afterAll(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
