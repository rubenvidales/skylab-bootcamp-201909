require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const reorderPlaylist = require('.')
const { random } = Math
const { database, models: { User, RSSChannel, Podcast } } = require('quickshare-data')
const { errors: { NotFoundError, ContentError } } = require('quickshare-util')

describe('logic - reorder podcasts from playlist', () => {
    before(() => database.connect(TEST_DB_URL))

    let name, surname, email, username, password, user

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        user = await new User({ name, surname, email, username, password })
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

    it('should succeed if the podcasts changes the order in the playlist', async () => {
        const aux1 = podcastIds[1]
        const aux2 = podcastIds[2]
        user.player = { playlist: [podcastIds[1], podcastIds[2]] }
        await user.save()

        const result = await reorderPlaylist(id, podcastIds[1], -1)

        expect(result).to.exist
        expect(result).to.be.an('array')
        expect(result.length).to.equal(2)

        user.player.playlist[0] === aux2
        user.player.playlist[1] === aux1
    })

    it('should succeed if the podcasts NOT changes the order in the playlist because the item is in the beggining of the array', async () => {
        const aux1 = podcastIds[1]
        const aux2 = podcastIds[2]
        user.player = { playlist: [podcastIds[1], podcastIds[2]] }
        await user.save()

        const result = await reorderPlaylist(id, podcastIds[1], 1)

        expect(result).to.exist
        expect(result).to.be.an('array')
        expect(result.length).to.equal(2)

        user.player.playlist[0] === aux1
        user.player.playlist[1] === aux2
    })

    it('should succeed if the podcasts NOT changes the order in the playlist because the item is in the end of the array', async () => {
        const aux1 = podcastIds[1]
        const aux2 = podcastIds[2]
        user.player = { playlist: [podcastIds[1], podcastIds[2]] }
        await user.save()

        const result = await reorderPlaylist(id, podcastIds[2], -1)

        expect(result).to.exist
        expect(result).to.be.an('array')
        expect(result.length).to.equal(2)

        user.player.playlist[0] === aux1
        user.player.playlist[1] === aux2
    })

    it('should fail on not existing user id', async () => {
        const notDefinedId = '012345678901234567890123'
        const aux1 = podcastIds[1]
        const aux2 = podcastIds[2]
        user.player = { playlist: [podcastIds[1], podcastIds[2]] }
        await user.save()

        try {
            await reorderPlaylist(notDefinedId,podcastIds[2], -1)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${notDefinedId} not found`)
        }
    })

    it('should fail on not valid user id', async () => {
        const notValidId = 'WrongId'
        const aux1 = podcastIds[1]
        const aux2 = podcastIds[2]
        user.player = { playlist: [podcastIds[1], podcastIds[2]] }
        await user.save()

        try {
            await reorderPlaylist(notValidId, podcastIds[2], -1)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ContentError)
            expect(error.message).to.equal(`${notValidId} is not a valid id`)
        }
    })

    it('should fail on not existing podcast id', async () => {
        const notDefinedId = '012345678901234567890123'
        const aux1 = podcastIds[1]
        const aux2 = podcastIds[2]
        user.player = { playlist: [podcastIds[1], podcastIds[2]] }
        await user.save()

        try {
            await reorderPlaylist(id, notDefinedId, -1)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`Podcast with id ${notDefinedId} in the playlist for the user with id ${id} not found`)
        }
    })

    it('should fail on not valid user id', async () => {
        const notValidId = 'WrongId'
        const aux1 = podcastIds[1]
        const aux2 = podcastIds[2]
        user.player = { playlist: [podcastIds[1], podcastIds[2]] }
        await user.save()

        try {
            await reorderPlaylist(id, notValidId, -1)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ContentError)
            expect(error.message).to.equal(`${notValidId} is not a valid id`)
        }
    })

    it('should fail on incorrect userId, podcastId, or expression type and content', () => {
        expect(() => reorderPlaylist(1)).to.throw(TypeError, '1 is not a string')
        expect(() => reorderPlaylist(true)).to.throw(TypeError, 'true is not a string')
        expect(() => reorderPlaylist([])).to.throw(TypeError, ' is not a string')
        expect(() => reorderPlaylist({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => reorderPlaylist(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => reorderPlaylist(null)).to.throw(TypeError, 'null is not a string')
        expect(() => reorderPlaylist('')).to.throw(ContentError, 'userId is empty or blank')
        expect(() => reorderPlaylist(' \t\r')).to.throw(ContentError, 'userId is empty or blank')

        expect(() => reorderPlaylist(id, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => reorderPlaylist(id, true)).to.throw(TypeError, 'true is not a string')
        expect(() => reorderPlaylist(id, [])).to.throw(TypeError, ' is not a string')
        expect(() => reorderPlaylist(id, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => reorderPlaylist(id, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => reorderPlaylist(id, null)).to.throw(TypeError, 'null is not a string')
        expect(() => reorderPlaylist(id, '')).to.throw(ContentError, 'podcastId is empty or blank')
        expect(() => reorderPlaylist(id, ' \t\r')).to.throw(ContentError, 'podcastId is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})