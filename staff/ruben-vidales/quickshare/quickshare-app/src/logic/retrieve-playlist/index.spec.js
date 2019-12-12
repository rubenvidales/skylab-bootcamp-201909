const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const retrievePlaylist = require('.')
const { random } = Math
const { errors: { CredentialsError, NotFoundError, ContentError } } = require('quickshare-util')
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - retrieve playlist', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, name, surname, email, username, password, user, rssId, rssTitle, rssUrl,
    podcastIds, podcastTitles, podcastUrls, podcastDurations

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        user = await new User({ name, surname, email, username, password })
        id = user.id
        token = jwt.sign({ sub: id }, TEST_SECRET)

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

    it('should succeed on correct user id and empty playlist', async () => {
        const playlist = await retrievePlaylist(token)
        
        expect(playlist).toBeDefined()
        expect(playlist).toBeType('array')
        expect(playlist).toHaveLength(0)
    })

    it('should succeed on correct user id and playlist with podcasts', async () => {
        //Save the 
        user.player = {playlist:podcastIds}
        await user.save()

        const playlist = await retrievePlaylist(token)
        expect(playlist).toBeDefined()
        expect(playlist).toBeType('array')
        expect(playlist).toHaveLength(10)
        
        playlist.forEach(podcast => {
            expect(podcast).toBeDefined()
            expect(podcast.id).toBeOneOf(podcastIds)
        })
    })

/*     it('should fail on incorrect user id', async () => {
        id = 'wrong'
        try {
            await retrievePlaylist(id)(id)
    
            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(TypeError)
        }
    }) */

    afterAll(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
