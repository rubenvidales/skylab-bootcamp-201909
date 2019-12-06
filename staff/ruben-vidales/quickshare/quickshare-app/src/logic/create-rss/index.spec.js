const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const createRss = require('.')
const { random } = Math
const { errors: { ContentError } } = require('quickshare-util')
const { database, models: { User, RSSChannel, Podcast }, ObjectId } = require('quickshare-data')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('logic - create rss channel', () => {
    debugger
    beforeAll(() => database.connect(TEST_DB_URL))

    let userId, token, name, surname, email, username, password, rssId, title, url, description, imageUrl, language

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })
        userId = user.id
        token = jwt.sign({ sub: userId }, TEST_SECRET)
    })

    it('should succeed on correct user and rss channel data', async () => {
        debugger
        url='https://www.ivoox.com/podcast-viviendo-del-cuento_fg_f1566301_filtro_1.xml'
        const rss = await createRss(token, url)
        debugger
        expect(rss).toBeDefined()

        expect(rss.id).toBeDefined()
        expect(typeof rss.id).toBe('string')
        expect(rss.id.length).toBeGreaterThan(0)
        expect(rss.title).toBeDefined()
        expect(rss.url).toBeDefined()
        expect(rss.description).toBeDefined()
        expect(rss.imageUrl).toBeDefined()
        expect(rss.language).toBeDefined()
    })

    afterAll(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})