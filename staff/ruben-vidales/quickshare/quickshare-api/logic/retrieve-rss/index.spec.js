require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const retrieveRss = require('.')
const { random } = Math
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const { errors: { NotFoundError, ContentError } } = require('quickshare-util')

describe('logic - retrieve rss', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, surname, email, username, password, rssIds, rssTitles, rssUrls

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        const user = await new User({ name, surname, email, username, password })
        id = user.id

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

        const rss = await retrieveRss(randomRssId)
        expect(rss).to.exist

        expect(rss.id).to.equal(randomRssId)
        expect(rss.id).to.be.a('string')
        expect(rss._id).to.not.exist

        expect(rss.title).to.be.a('string')
        expect(rss.title).be.oneOf(rssTitles)

        expect(rss.url).to.be.a('string')
        expect(rss.url).be.oneOf(rssUrls)

    })

    it('should fail on not existing rss', async () => {
        const notExisting = '5deed854a2d9e324445e38bd'

        try {
            const channel = await retrieveRss(notExisting)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)

            const { message } = error
            expect(message).to.equal(`Rss channel with id ${notExisting} not found`)
        }
    })

    it('should fail on incorrect rss id format', async () => {
        const wrongId = 'incorrect-podcast-id'

        try {
            const channel = await retrieveRss(wrongId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ContentError)

            const { message } = error
            expect(message).to.equal(`${wrongId} is not a valid id`)
        }
    })

    it('should fail on incorrect podcast id, or expression type and content', () => {
        expect(() => retrieveRss(1)).to.throw(TypeError, '1 is not a string')
        expect(() => retrieveRss(true)).to.throw(TypeError, 'true is not a string')
        expect(() => retrieveRss([])).to.throw(TypeError, ' is not a string')
        expect(() => retrieveRss({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => retrieveRss(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => retrieveRss(null)).to.throw(TypeError, 'null is not a string')
        expect(() => retrieveRss('')).to.throw(ContentError, 'id is empty or blank')
        expect(() => retrieveRss(' \t\r')).to.throw(ContentError, 'id is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
