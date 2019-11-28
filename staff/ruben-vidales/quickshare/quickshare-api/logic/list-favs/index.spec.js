require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listUserFavs = require('.')
const { random } = Math
const { database, ObjectId, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

describe('logic - list favs', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, surname, email, username, password, rssId, rssTitle, rssUrl,
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

    it('should succeed on correct user and task data', async () => {

        const podcasts = await listUserFavs(id)

        expect(podcasts).to.exist
        expect(podcasts).to.have.lengthOf(10)

        podcasts.forEach(podcast => {
            expect(podcast.id).to.exist
            expect(podcast.id).to.be.a('string')
            expect(podcast.id).to.have.length.greaterThan(0)
            expect(podcast.id).be.oneOf(podcastIds)

            expect(podcast.title).to.exist
            expect(podcast.title).to.be.a('string')
            expect(podcast.title).to.have.length.greaterThan(0)
            expect(podcast.title).be.oneOf(podcastTitles)

            expect(podcast.url).to.exist
            expect(podcast.url).to.be.a('string')
            expect(podcast.url).to.have.length.greaterThan(0)
            expect(podcast.url).be.oneOf(podcastUrls)

            expect(podcast.duration).to.exist
            expect(podcast.duration).to.be.a('number')
            expect(podcast.duration).greaterThan(0)
            expect(podcast.duration).be.oneOf(podcastDurations)
        })
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
