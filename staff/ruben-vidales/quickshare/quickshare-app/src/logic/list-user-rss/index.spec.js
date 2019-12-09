const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const listUserRss = require('.')
const { random } = Math
const { errors: { CredentialsError, NotFoundError } } = require('quickshare-util')
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - list user rss', () => {
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

    it('should succeed on correct user', async () => {
        const rssChannels = await listUserRss(token)

        expect(rssChannels).toBeDefined()
        expect(rssChannels).toHaveLength(10)

        rssChannels.forEach(rss => {
            expect(rss.id).toBeDefined()
            expect(rss.id).toBeOfType('string')
            expect(rss.id).toHaveLengthGreaterThan(0)
            expect(rss.id).toBeOneOf(rssIds)

            expect(rss.title).toBeDefined()
            expect(rss.title).toBeOfType('string')
            expect(rss.title).toHaveLengthGreaterThan(0)
            expect(rss.title).toBeOneOf(rssTitles)

            expect(rss.url).toBeDefined()
            expect(rss.url).toBeOfType('string')
            expect(rss.url).toHaveLengthGreaterThan(0)
            expect(rss.url).toBeOneOf(rssUrls)
        })
    })

    afterAll(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})