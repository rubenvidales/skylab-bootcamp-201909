require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const modifyCurrentEpisode = require('.')
const { random } = Math
const { database, models: { User, RSSChannel, Podcast, Player } } = require('quickshare-data')
const { errors: { ContentError } } = require('quickshare-util')

describe('logic - modify current episode', () => {
    before(() => database.connect(TEST_DB_URL))

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        const user = await new User({ name, surname, email, username, password, player: new Player() })
        userId = user.id

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

    it('should succeed on correct data', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)]
        const randomPosition = Math.floor(Math.random() * 1000) + 1
        const randomActive = Math.random() >= 0.5

        const result = await modifyCurrentEpisode(userId, randomPodcast, randomPosition, randomActive)

        let resultUser = await User.findById(userId)
        resultUser = resultUser.toObject()
        expect(resultUser).to.exist

        expect(resultUser.name).to.equal(name)
        expect(resultUser.name).to.be.a('string')
        expect(resultUser.surname).to.equal(surname)
        expect(resultUser.surname).to.be.a('string')
        expect(resultUser.email).to.equal(email)
        expect(resultUser.email).to.be.a('string')
        expect(resultUser.username).to.equal(username)
        expect(resultUser.username).to.be.a('string')

        expect(resultUser.rssChannels).to.be.an('array')
        expect(resultUser.favs).to.be.an('array')

        expect(resultUser.player.currentEpisode.podcast.toString()).to.equal(randomPodcast)
        expect(resultUser.player.currentEpisode.position).to.equal(randomPosition)
        expect(resultUser.player.currentEpisode.active).to.equal(randomActive)
    })

    it('should succeed on correct data: only change randomPodcast', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)]

        const user = await User.findById(userId)

        const result = await modifyCurrentEpisode(userId, randomPodcast)

        let resultUser = await User.findById(userId)
        resultUser = resultUser.toObject()
        expect(resultUser).to.exist

        expect(resultUser.name).to.equal(name)
        expect(resultUser.name).to.be.a('string')
        expect(resultUser.surname).to.equal(surname)
        expect(resultUser.surname).to.be.a('string')
        expect(resultUser.email).to.equal(email)
        expect(resultUser.email).to.be.a('string')
        expect(resultUser.username).to.equal(username)
        expect(resultUser.username).to.be.a('string')

        expect(resultUser.rssChannels).to.be.an('array')
        expect(resultUser.favs).to.be.an('array')

        expect(resultUser.player.currentEpisode.podcast.toString()).to.equal(randomPodcast)
        expect(resultUser.player.currentEpisode.position).to.equal(user.player.currentEpisode.position)
        expect(resultUser.player.currentEpisode.active).to.equal(user.player.currentEpisode.active)
    })

    it('should succeed on correct data: change randomPodcast and randomPosition', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)]
        const randomPosition = Math.floor(Math.random() * 1000) + 1

        const user = await User.findById(userId)

        const result = await modifyCurrentEpisode(userId, randomPodcast, randomPosition)

        let resultUser = await User.findById(userId)
        resultUser = resultUser.toObject()
        expect(resultUser).to.exist

        expect(resultUser.name).to.equal(name)
        expect(resultUser.name).to.be.a('string')
        expect(resultUser.surname).to.equal(surname)
        expect(resultUser.surname).to.be.a('string')
        expect(resultUser.email).to.equal(email)
        expect(resultUser.email).to.be.a('string')
        expect(resultUser.username).to.equal(username)
        expect(resultUser.username).to.be.a('string')

        expect(resultUser.rssChannels).to.be.an('array')
        expect(resultUser.favs).to.be.an('array')

        expect(resultUser.player.currentEpisode.podcast.toString()).to.equal(randomPodcast)
        expect(resultUser.player.currentEpisode.position).to.equal(randomPosition)
        expect(resultUser.player.currentEpisode.active).to.equal(user.player.currentEpisode.active)
    })

    it('should succeed on correct data: change randomPodcast and randomActive', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)]
        const randomActive = Math.random() >= 0.5

        const user = await User.findById(userId)

        const result = await modifyCurrentEpisode(userId, randomPodcast, undefined, randomActive)

        let resultUser = await User.findById(userId)
        resultUser = resultUser.toObject()
        expect(resultUser).to.exist

        expect(resultUser.name).to.equal(name)
        expect(resultUser.name).to.be.a('string')
        expect(resultUser.surname).to.equal(surname)
        expect(resultUser.surname).to.be.a('string')
        expect(resultUser.email).to.equal(email)
        expect(resultUser.email).to.be.a('string')
        expect(resultUser.username).to.equal(username)
        expect(resultUser.username).to.be.a('string')

        expect(resultUser.rssChannels).to.be.an('array')
        expect(resultUser.favs).to.be.an('array')

        expect(resultUser.player.currentEpisode.podcast.toString()).to.equal(randomPodcast)
        expect(resultUser.player.currentEpisode.position).to.equal(user.player.currentEpisode.position)
        expect(resultUser.player.currentEpisode.active).to.equal(randomActive)
    })


    it('should fail on incorrect userId, title, url, description, or expression type and content', () => {
        expect(() => modifyCurrentEpisode(1)).to.throw(TypeError, '1 is not a string')
        expect(() => modifyCurrentEpisode(true)).to.throw(TypeError, 'true is not a string')
        expect(() => modifyCurrentEpisode([])).to.throw(TypeError, ' is not a string')
        expect(() => modifyCurrentEpisode({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => modifyCurrentEpisode(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => modifyCurrentEpisode(null)).to.throw(TypeError, 'null is not a string')
        expect(() => modifyCurrentEpisode('')).to.throw(ContentError, 'userId is empty or blank')
        expect(() => modifyCurrentEpisode(' \t\r')).to.throw(ContentError, 'userId is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})