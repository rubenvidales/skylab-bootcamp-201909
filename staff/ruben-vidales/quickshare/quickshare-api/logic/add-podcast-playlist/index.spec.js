require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const addPodcastToPlaylist = require('.')
const { random } = Math
const { database, models: { User, RSSChannel, Podcast, Player } } = require('quickshare-data')
const { errors: { NotFoundError, ContentError } } = require('quickshare-util')

describe('logic - add podcast to playlist', () => {
    before(() => database.connect(TEST_DB_URL))

    let name, surname, email, username, password, user

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        user = await new User({ name, surname, email, username, password, player: new Player() })
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


    it('should succeed on correct user and podcast data and the podcast is not in the playlist: empty playlist', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)];

        const result = await addPodcastToPlaylist(id, randomPodcast)

        expect(result).to.exist
        expect(result).to.be.an('array')
        expect(result.length).to.equal(1)
        expect(result[0].id).to.equal(randomPodcast)
    })

    it('should succeed on correct user and podcast data and the podcast is not in the playlist: playlist with other podcasts', async () => {
        user.player = {playlist:[podcastIds[0]]}
        await user.save()

        const result = await addPodcastToPlaylist(id, podcastIds[1])

        expect(result).to.exist
        expect(result).to.be.an('array')
        expect(result.length).to.equal(2)

        result.forEach(elem => {
            expect(podcastIds).to.contain(elem.id)
        })
    })

    it('should succeed on correct user and podcast data and the podcast is in the playlist', async () => {
        user.player = {playlist:[podcastIds[1]]}
        await user.save()

        const result = await addPodcastToPlaylist(id, podcastIds[1])

        expect(result).to.exist
        expect(result).to.be.an('array')
        expect(result.length).to.equal(1)
        result.forEach(elem => {
            expect(podcastIds).to.contain(elem.id)
        })
    })

    it('should fail if the podcast id does not exist but the id is correct formed', async () => {
        //Take a random existing podcast in user
        const wrongPodcastId = '5deed854a2d9e324445e38bd'

        try {
            const result = await addPodcastToPlaylist(id, wrongPodcastId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)

            const { message } = error
            expect(message).to.equal(`podcast with id ${wrongPodcastId} not found`)
        }
    })

    it('should fail on incorrect userId, podcastId, or expression type and content', () => {
        expect(() => addPodcastToPlaylist(1)).to.throw(TypeError, '1 is not a string')
        expect(() => addPodcastToPlaylist(true)).to.throw(TypeError, 'true is not a string')
        expect(() => addPodcastToPlaylist([])).to.throw(TypeError, ' is not a string')
        expect(() => addPodcastToPlaylist({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => addPodcastToPlaylist(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => addPodcastToPlaylist(null)).to.throw(TypeError, 'null is not a string')
        expect(() => addPodcastToPlaylist('')).to.throw(ContentError, 'userId is empty or blank')
        expect(() => addPodcastToPlaylist(' \t\r')).to.throw(ContentError, 'userId is empty or blank')

        expect(() => addPodcastToPlaylist(id, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => addPodcastToPlaylist(id, true)).to.throw(TypeError, 'true is not a string')
        expect(() => addPodcastToPlaylist(id, [])).to.throw(TypeError, ' is not a string')
        expect(() => addPodcastToPlaylist(id, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => addPodcastToPlaylist(id, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => addPodcastToPlaylist(id, null)).to.throw(TypeError, 'null is not a string')
        expect(() => addPodcastToPlaylist(id, '')).to.throw(ContentError, 'podcastId is empty or blank')
        expect(() => addPodcastToPlaylist(id, ' \t\r')).to.throw(ContentError, 'podcastId is empty or blank')
    })


    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})