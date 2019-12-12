require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const retrievePodcast = require('.')
const { random } = Math
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const { errors: { NotFoundError, ContentError } } = require('quickshare-util')

describe('logic - retrieve podcast', () => {
    before(() => database.connect(TEST_DB_URL))

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

    it('should succeed on correct rss id', async () => {

        const randomPodcastId = podcastIds[Math.floor(Math.random() * podcastIds.length)];

        const podcast = await retrievePodcast(randomPodcastId)
        expect(podcast).to.exist

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

    it('should fail on not existing podcast', async () => {
        const notExisting = '5deed854a2d9e324445e38bd'

        try {
            const channel = await retrievePodcast(notExisting)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)

            const { message } = error
            expect(message).to.equal(`podcast with id ${notExisting} not found`)
        }
    })

    it('should fail on incorrect podcast id format', async () => {
        const wrongId = 'incorrect-podcast-id'

        try {
            const channel = await retrievePodcast(wrongId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ContentError)

            const { message } = error
            expect(message).to.equal(`${wrongId} is not a valid id`)
        }
    })

    it('should fail on incorrect podcast id, or expression type and content', () => {
        expect(() => retrievePodcast(1)).to.throw(TypeError, '1 is not a string')
        expect(() => retrievePodcast(true)).to.throw(TypeError, 'true is not a string')
        expect(() => retrievePodcast([])).to.throw(TypeError, ' is not a string')
        expect(() => retrievePodcast({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => retrievePodcast(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => retrievePodcast(null)).to.throw(TypeError, 'null is not a string')
        expect(() => retrievePodcast('')).to.throw(ContentError, 'id is empty or blank')
        expect(() => retrievePodcast(' \t\r')).to.throw(ContentError, 'id is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})