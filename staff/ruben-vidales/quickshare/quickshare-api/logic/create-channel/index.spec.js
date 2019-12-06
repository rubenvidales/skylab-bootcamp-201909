require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createChannel = require('.')
const { random } = Math
const { database, ObjectId, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

describe('logic - create channel', () => {
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

        await user.save()
    })

    it('should succeed on correct url', async () => {
        const url = 'https://www.ivoox.com/podcast-viviendo-del-cuento_fg_f1566301_filtro_1.xml'
        const channel = await createChannel(id,url)

        expect(channel).to.exist
        expect(channel.id).to.exist
        expect(channel.id).to.be.a('string')
        expect(channel.id).to.have.length.greaterThan(0)
        expect(channel.title).to.exist
        expect(channel.url).to.exist
        expect(channel.description).to.exist
        expect(channel.imageUrl).to.exist
        expect(channel.language).to.exist
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
