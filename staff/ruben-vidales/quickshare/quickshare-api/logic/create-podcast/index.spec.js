require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createPodcast = require('.')
const { floor, random } = Math
const { converter, errors: { ContentError } } = require('quickshare-util')
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

        //TODO: Validate urls
        rssTitle = `rss-title-${random()}`
        rssUrl = `rss-url-${random()}`
        rssDescription = `rss-description-${random()}`
        rssImageUrl = `rss-imageUrl-${random()}`
        rssLanguage = `rss-language-${random()}`

        const rss = await RSSChannel.create({ title: rssTitle, url: rssUrl, description: rssDescription, imageUrl: rssImageUrl, language: rssLanguage })
        rssId = rss.id

        podcastTitle = `podcast-title-${random()}`
        podcastUrl = `podcast-url-${random()}`
        podcastDescription = `podcast-description-${random()}`
        podcastPublicationDate = new Date()
        podcastDuration = floor(random() * 1000) + 1
    })

    it('should succeed on correct user, rss channel and podcast data', async () => {
        const podcastId = await createPodcast(podcastTitle, podcastUrl, rssId, podcastDescription, podcastPublicationDate, podcastDuration)

        expect(podcastId).to.exist
        expect(podcastId).to.be.a('string')
        expect(podcastId).to.have.length.greaterThan(0)

        const podcast = await Podcast.findById(podcastId)

        expect(podcast).to.exist
        expect(podcast.title).to.equal(podcastTitle)
        expect(podcast.url).to.equal(podcastUrl)
        expect(podcast.description).to.equal(podcastDescription)
        expect(podcast.publicationDate).to.equal(podcastPublicationDate)
        expect(podcast.duration).to.equal(podcastDuration)
    })

    /*     describe('when rss channel already exists', () => {
            beforeEach(async() => {
                const rss = await RSSChannel.create({ title, url, description, imageUrl, language })
                await User.updateOne({ _id: ObjectId(userId) },{ $set: {rssChannels: rss.id} })
            })
    
            it('should avoid to create another rss register', async () => {
    
                await createRss(userId, title, url, description, imageUrl, language)
                const result = await RSSChannel.find({url})
    
                expect(result).to.exist
                expect(result.length).to.equal(1)
    
            })
        }) */

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})