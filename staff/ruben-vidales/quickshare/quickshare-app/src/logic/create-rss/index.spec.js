const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
const createRss = require('.')
const { random } = Math
const { errors: { ContentError } } = require('quickshare-util')
const { database, models: { User, RSSChannel } } = require('quickshare-data')
const bcrypt = require('bcryptjs')

describe('logic - register user', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

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
        

        //TODO: Validate urls
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
        beforeEach(async () => {
            const rss = await RSSChannel.create({ title, url, description, imageUrl, language })
            await User.updateOne({ _id: ObjectId(userId) }, { $set: { rssChannels: rss.id } })
        })

        it('should avoid to create another rss register', async () => {

            await createRss(userId, title, url, description, imageUrl, language)
            const result = await RSSChannel.find({ url })

            expect(result).to.exist
            expect(result.length).to.equal(1)

        })
    })


    afterAll(() => User.deleteMany().then(database.disconnect))
})