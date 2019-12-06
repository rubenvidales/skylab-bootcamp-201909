const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const createRss = require('.')
const { random } = Math
const { errors: { ContentError } } = require('quickshare-util')
const { database, models: { User, RSSChannel }, ObjectId } = require('quickshare-data')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('logic - create rss channel', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let userId, token, name, surname, email, username, password, rssId, title, url, description, imageUrl, language

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })
        userId = user.id
        token = jwt.sign({ sub: userId }, TEST_SECRET)


        //TODO: Validate urls
        title = `rss-title-${random()}`
        url = `www.rss-url-${random()}.com`
        description = `rss-description-${random()}`
        imageUrl = `wwww.rss-imageUrl-${random()}.com/image.jpg`
        language = `rss-language-${random()}`
    })

    it('should succeed on correct user and rss channel data', async () => {
        const rss = await createRss(token, title, url, description, imageUrl, language)
        debugger
        expect(rss).toBeDefined()

        expect(rss.id).toBeDefined()
        expect(typeof rss.id).toBe('string')
        expect(rss.id.length).toBeGreaterThan(0)
        expect(rss.title).toEqual(title)
        expect(rss.url).toEqual(url)
        expect(rss.description).toEqual(description)
        expect(rss.imageUrl).toEqual(imageUrl)
        expect(rss.language).toEqual(language)
    })

    describe('when rss channel already exists', () => {
        beforeEach(async () => {
            const rss = await RSSChannel.create({ title, url, description, imageUrl, language })
            await User.updateOne({ _id: ObjectId(userId) }, { $set: { rssChannels: rss.id } })
        })

        it('should avoid to create another rss register', async () => {

            await createRss(token, title, url, description, imageUrl, language)
            const result = await RSSChannel.find({ url })

            expect(result).toBeDefined()
            expect(result.length).toEqual(1)

        })
    })


    afterAll(() => User.deleteMany().then(database.disconnect))
})