require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createPodcast = require('.')
const { floor, random } = Math
const { converter, errors: { ContentError, ConflictError } } = require('quickshare-util')
const { ObjectId, database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

describe('logic - create podcast', () => {
    before(() => {
        database.connect(TEST_DB_URL)
    })

    let userId, name, surname, email, username, password, rssId, rssTitle, rssUrl, rssDescription, rssImageUrl, rssLanguage,
        podcastTitle, podcastUrl, podcastDescription, podcastPublicationDate, podcastDuration

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })
        userId = user.id

        rssTitle = `rss-title-${random()}`
        rssUrl = `www.rss-url-${random()}.com`
        rssDescription = `rss-description-${random()}`
        rssImageUrl = `rss-imageUrl-${random()}`
        rssLanguage = `rss-language-${random()}`

        const rss = await RSSChannel.create({ title: rssTitle, url: rssUrl, description: rssDescription, imageUrl: rssImageUrl, language: rssLanguage })
        rssId = rss.id

        podcastTitle = `podcast-title-${random()}`
        podcastUrl = `www.podcast-url-${random()}.com`
        podcastDescription = `podcast-description-${random()}`
        podcastPublicationDate = '12/02/2019 11:11'
        podcastDuration = floor(random() * 1000) + 1
    })

    it('should succeed on correct user, rss channel and podcast data', async () => {
        const podcast = await createPodcast(podcastTitle, podcastUrl, rssId, podcastDescription, podcastPublicationDate, podcastDuration)

        expect(podcast).to.exist
        expect(podcast.id).to.exist
        expect(podcast.id).to.be.a('string')
        expect(podcast.id).to.have.length.greaterThan(0)
        expect(podcast.title).to.equal(podcastTitle)
        expect(podcast.url).to.equal(podcastUrl)
        expect(podcast.description).to.equal(podcastDescription)
        expect(podcast.publicationDate.toString()).to.equal(new Date(podcastPublicationDate+':00.000+00:00').toString())
        expect(podcast.duration).to.equal(podcastDuration)
    })

    describe('when podcast already exists', () => {
        beforeEach(async () => {
            const rss = await Podcast.create({ title: podcastTitle, url: podcastUrl, rssChannel: rssId, description: podcastDescription, podcastPublicationDate, podcastDuration })
        })

        it('should fail on already existing podcast', async () => {
            try {
                await createPodcast(podcastTitle, podcastUrl, rssId, podcastDescription, podcastPublicationDate, podcastDuration)

                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error.message).to.exist
                expect(typeof error.message).to.equal('string')
                expect(error.message.length).to.be.greaterThan(0)
                expect(error.message).to.equal(`podcast with url ${podcastUrl} already exists`)
            }
        })
    })
    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})