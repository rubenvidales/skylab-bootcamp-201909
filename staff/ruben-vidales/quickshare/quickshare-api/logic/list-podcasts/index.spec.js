require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listPodcasts = require('.')
const { random } = Math
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const { errors: { ContentError } } = require('quickshare-util')

describe('logic - list podcast by rss id', () => {
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
        user.rssChannels.push(rss.id)

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

    it('should succeed on correct rss id', async () => {

        const podcasts = await listPodcasts(rssId)
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

    it('should succeed on correct rss id: empty list', async () => {
        await Podcast.deleteMany()

        const podcasts = await listPodcasts(rssId)
        expect(podcasts).to.exist
        expect(podcasts).to.be.an('array')
        expect(podcasts).to.have.lengthOf(0)
    })

    it('should fail on incorrect userId, podcastId, or expression type and content', () => {
        expect(() => listPodcasts(1)).to.throw(TypeError, '1 is not a string')
        expect(() => listPodcasts(true)).to.throw(TypeError, 'true is not a string')
        expect(() => listPodcasts([])).to.throw(TypeError, ' is not a string')
        expect(() => listPodcasts({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => listPodcasts(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => listPodcasts(null)).to.throw(TypeError, 'null is not a string')
        expect(() => listPodcasts('')).to.throw(ContentError, 'rssId is empty or blank')
        expect(() => listPodcasts(' \t\r')).to.throw(ContentError, 'rssId is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
