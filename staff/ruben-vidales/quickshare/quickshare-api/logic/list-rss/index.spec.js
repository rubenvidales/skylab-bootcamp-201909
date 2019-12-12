require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listRss = require('.')
const { random } = Math
const { database, ObjectId, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

describe('logic - list all rss channels', () => {
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

    it('should succeed and return all rss channels', async () => {
        const rssChannels = await listRss()
        expect(rssChannels).to.exist
        expect(rssChannels).to.have.lengthOf(10)

        rssChannels.forEach(rssChannel => {
            expect(rssChannel.id).to.exist
            expect(rssChannel.id).to.be.a('string')
            expect(rssChannel.id).to.have.length.greaterThan(0)
            expect(rssChannel.id).be.oneOf(rssIds)

            expect(rssChannel.title).to.exist
            expect(rssChannel.title).to.be.a('string')
            expect(rssChannel.title).to.have.length.greaterThan(0)
            expect(rssChannel.title).be.oneOf(rssTitles)

            expect(rssChannel.url).to.exist
            expect(rssChannel.url).to.be.a('string')
            expect(rssChannel.url).to.have.length.greaterThan(0)
            expect(rssChannel.url).be.oneOf(rssUrls)
        })
    })

    it('should succeed and return an empty array if no rss in the database', async () => {
        await RSSChannel.deleteMany()

        const rssChannels = await listRss()
        expect(rssChannels).to.exist
        expect(rssChannels).to.have.lengthOf(0)
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
