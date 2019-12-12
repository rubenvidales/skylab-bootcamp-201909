require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createRss = require('.')
const { random } = Math
const { errors: { ContentError } } = require('quickshare-util')
const { ObjectId, database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

describe('logic - create rss channel', () => {
    before( () => {
        database.connect(TEST_DB_URL)
    })

    let userId, name, surname, email, username, password, rssId, title, url, description, imageUrl, language

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })
        userId = user.id

        title = `rss-title-${random()}`
        url = `www.rss-url-${random()}.com`
        description = `rss-description-${random()}`
        imageUrl = `wwww.rss-imageUrl-${random()}.com/image.jpg`
        language = `rss-language-${random()}`
    })

    it('should succeed on correct user and rss channel data', async () => {
        const rss = await createRss(userId, title, url, description, imageUrl, language)
        expect(rss).to.exist

        expect(rss.id).to.exist
        expect(rss.id).to.be.a('string')
        expect(rss.id).to.have.length.greaterThan(0)
        expect(rss.title).to.equal(title)
        expect(rss.url).to.equal(url)
        expect(rss.description).to.equal(description)
        expect(rss.imageUrl).to.equal(imageUrl)
        expect(rss.language).to.equal(language)
    })

    describe('when rss channel already exists', () => {
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
    })

    it('should fail on incorrect userId, title, url, description, or expression type and content', () => {
        expect(() => createRss(1)).to.throw(TypeError, '1 is not a string')
        expect(() => createRss(true)).to.throw(TypeError, 'true is not a string')
        expect(() => createRss([])).to.throw(TypeError, ' is not a string')
        expect(() => createRss({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createRss(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createRss(null)).to.throw(TypeError, 'null is not a string')
        expect(() => createRss('')).to.throw(ContentError, 'userId is empty or blank')
        expect(() => createRss(' \t\r')).to.throw(ContentError, 'userId is empty or blank')

        expect(() => createRss(userId, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createRss(userId, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createRss(userId, [])).to.throw(TypeError, ' is not a string')
        expect(() => createRss(userId, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createRss(userId, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createRss(userId, null)).to.throw(TypeError, 'null is not a string')
        expect(() => createRss(userId, '')).to.throw(ContentError, 'title is empty or blank')
        expect(() => createRss(userId, ' \t\r')).to.throw(ContentError, 'title is empty or blank')

        expect(() => createRss(userId, title, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createRss(userId, title, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createRss(userId, title, [])).to.throw(TypeError, ' is not a string')
        expect(() => createRss(userId, title, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createRss(userId, title, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createRss(userId, title, null)).to.throw(TypeError, 'null is not a string')
        expect(() => createRss(userId, title, '')).to.throw(ContentError, 'url is empty or blank')
        expect(() => createRss(userId, title, ' \t\r')).to.throw(ContentError, 'url is empty or blank')

        expect(() => createRss(userId, title, url, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createRss(userId, title, url, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createRss(userId, title, url, [])).to.throw(TypeError, ' is not a string')
        expect(() => createRss(userId, title, url, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createRss(userId, title, url, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createRss(userId, title, url, null)).to.throw(TypeError, 'null is not a string')
        expect(() => createRss(userId, title, url, '')).to.throw(ContentError, 'description is empty or blank')
        expect(() => createRss(userId, title, url, ' \t\r')).to.throw(ContentError, 'description is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany()]).then(database.disconnect))
})