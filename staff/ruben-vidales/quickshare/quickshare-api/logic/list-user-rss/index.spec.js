require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listUserRss = require('.')
const { random } = Math
const { database, ObjectId, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

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

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
