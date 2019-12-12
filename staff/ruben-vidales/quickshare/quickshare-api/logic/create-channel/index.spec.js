require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createChannel = require('.')
const { random } = Math
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const { errors: { NotFoundError, ContentError } } = require('quickshare-util')

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

    it('should fail on not well formed url', async () => {
        const url = 'incorrect-web-string'

        try {
            const channel = await createChannel(id,url)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ContentError)

            const { message } = error
            expect(message).to.equal(`${url} is not an url`)
        }
    })

    it('should fail on incorrect userId, url, or expression type and content', () => {
        expect(() => createChannel(1)).to.throw(TypeError, '1 is not a string')
        expect(() => createChannel(true)).to.throw(TypeError, 'true is not a string')
        expect(() => createChannel([])).to.throw(TypeError, ' is not a string')
        expect(() => createChannel({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createChannel(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createChannel(null)).to.throw(TypeError, 'null is not a string')
        expect(() => createChannel('')).to.throw(ContentError, 'userId is empty or blank')
        expect(() => createChannel(' \t\r')).to.throw(ContentError, 'userId is empty or blank')

        expect(() => createChannel(id, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createChannel(id, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createChannel(id, [])).to.throw(TypeError, ' is not a string')
        expect(() => createChannel(id, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createChannel(id, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createChannel(id, null)).to.throw(TypeError, 'null is not a string')
        expect(() => createChannel(id, '')).to.throw(ContentError, 'url is empty or blank')
        expect(() => createChannel(id, ' \t\r')).to.throw(ContentError, 'url is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
