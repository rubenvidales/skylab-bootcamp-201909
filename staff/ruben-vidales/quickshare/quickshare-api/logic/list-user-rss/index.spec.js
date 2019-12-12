require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listUserRss = require('.')
const { random } = Math
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const { errors: { ContentError } } = require('quickshare-util')

describe('logic - list favs', () => {
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

    it('should succeed on correct user', async () => {
        const rssChannels = await listUserRss(id)

        expect(rssChannels).to.exist
        expect(rssChannels).to.have.lengthOf(10)

        rssChannels.forEach(rss => {
            expect(rss.id).to.exist
            expect(rss.id).to.be.a('string')
            expect(rss.id).to.have.length.greaterThan(0)
            expect(rss.id).be.oneOf(rssIds)

            expect(rss.title).to.exist
            expect(rss.title).to.be.a('string')
            expect(rss.title).to.have.length.greaterThan(0)
            expect(rss.title).be.oneOf(rssTitles)

            expect(rss.url).to.exist
            expect(rss.url).to.be.a('string')
            expect(rss.url).to.have.length.greaterThan(0)
            expect(rss.url).be.oneOf(rssUrls)
        })
    })

    it('should succeed on correct user: empty rss channels list', async () => {
        await User.findById(id).updateOne({$set: { rssChannels: [] }})

        const podcasts = await listUserRss(id)

        expect(podcasts).to.exist
        expect(podcasts).to.be.an('array')
        expect(podcasts).to.have.lengthOf(0)
    })

    it('should fail on incorrect userId, or expression type and content', () => {
        expect(() => listUserRss(1)).to.throw(TypeError, '1 is not a string')
        expect(() => listUserRss(true)).to.throw(TypeError, 'true is not a string')
        expect(() => listUserRss([])).to.throw(TypeError, ' is not a string')
        expect(() => listUserRss({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => listUserRss(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => listUserRss(null)).to.throw(TypeError, 'null is not a string')
        expect(() => listUserRss('')).to.throw(ContentError, 'userId is empty or blank')
        expect(() => listUserRss(' \t\r')).to.throw(ContentError, 'userId is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
