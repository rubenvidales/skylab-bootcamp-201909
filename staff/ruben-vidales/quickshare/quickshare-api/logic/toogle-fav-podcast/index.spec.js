require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const toogleFavPodcast = require('.')
const { random } = Math
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const { errors: { NotFoundError, ContentError } } = require('quickshare-util')

describe('logic - toogle user fav user', () => {
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

    it('when fav not exists: should succeed on correct user and podcast data', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)];
        const user = await User.findById(id)
        const index = user.favs.findIndex(fav => fav._id == randomPodcast)
        user.favs.splice(index, 1)
        await user.save()

        const result = await toogleFavPodcast(id, randomPodcast)

        expect(result).to.exist
        expect(result.length).to.equal(podcastIds.length)
    })

    it('when fav already exists: should succeed on correct user and podcast data', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)];

        const result = await toogleFavPodcast(id, randomPodcast)

        expect(result).to.exist
        expect(result.length).to.equal(podcastIds.length - 1)
    })


    it('should fail on not existing podcast', async () => {
        const notExisting = '5deed854a2d9e324445e38bd'

        try {
            const channel = await toogleFavPodcast(id, notExisting)
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
            const channel = await toogleFavPodcast(id, wrongId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ContentError)

            const { message } = error
            expect(message).to.equal(`${wrongId} is not a valid id`)
        }
    })

    it('should fail on incorrect podcast id, or expression type and content', () => {
        expect(() => toogleFavPodcast(1)).to.throw(TypeError, '1 is not a string')
        expect(() => toogleFavPodcast(true)).to.throw(TypeError, 'true is not a string')
        expect(() => toogleFavPodcast([])).to.throw(TypeError, ' is not a string')
        expect(() => toogleFavPodcast({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => toogleFavPodcast(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => toogleFavPodcast(null)).to.throw(TypeError, 'null is not a string')
        expect(() => toogleFavPodcast('')).to.throw(ContentError, 'userId is empty or blank')
        expect(() => toogleFavPodcast(' \t\r')).to.throw(ContentError, 'userId is empty or blank')

        expect(() => toogleFavPodcast(id, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => toogleFavPodcast(id, true)).to.throw(TypeError, 'true is not a string')
        expect(() => toogleFavPodcast(id, [])).to.throw(TypeError, ' is not a string')
        expect(() => toogleFavPodcast(id, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => toogleFavPodcast(id, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => toogleFavPodcast(id, null)).to.throw(TypeError, 'null is not a string')
        expect(() => toogleFavPodcast(id, '')).to.throw(ContentError, 'podcastId is empty or blank')
        expect(() => toogleFavPodcast(id, ' \t\r')).to.throw(ContentError, 'podcastId is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})