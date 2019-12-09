const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const modifyCurrentEpisode = require('.')
const { random } = Math
const { errors: { CredentialsError, NotFoundError } } = require('quickshare-util')
const { database, models: { User, RSSChannel, Podcast, Player } } = require('quickshare-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - modify current episode in players user', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, name, surname, email, username, password, rssId, rssTitle, rssUrl,
        podcastIds, podcastTitles, podcastUrls, podcastDurations, user

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()])

        user = await new User({ name, surname, email, username, password, player: new Player() })
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

    it('should succeed on correct data: all data of current', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)]
        const randomPosition = Math.floor(Math.random() * 1000) + 1
        const randomActive = Math.random() >= 0.5

        await modifyCurrentEpisode(token, randomPodcast, randomPosition, randomActive)

        const resultUser = await User.findById(id)
        expect(resultUser).toBeDefined()

        expect(resultUser.name).toEqual(name)
        expect(resultUser.name).toBeOfType('string')
        expect(resultUser.surname).toEqual(surname)
        expect(resultUser.surname).toBeOfType('string')
        expect(resultUser.email).toEqual(email)
        expect(resultUser.email).toBeOfType('string')
        expect(resultUser.username).toEqual(username)
        expect(resultUser.username).toBeOfType('string')

        expect(resultUser.rssChannels).toBeType('array')
        expect(resultUser.favs).toBeType('array')

        expect(resultUser.player.currentEpisode.podcastId.toString()).toEqual(randomPodcast)
        expect(resultUser.player.currentEpisode.position).toEqual(randomPosition)
        expect(resultUser.player.currentEpisode.active).toEqual(randomActive)
    })

    it('should succeed on correct data: all data of current', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)]
        const randomPosition = Math.floor(Math.random() * 1000) + 1
        const randomActive = Math.random() >= 0.5

        await modifyCurrentEpisode(token, randomPodcast, null, randomActive)

        const resultUser = await User.findById(id)
        expect(resultUser).toBeDefined()

        expect(resultUser.name).toEqual(name)
        expect(resultUser.name).toBeOfType('string')
        expect(resultUser.surname).toEqual(surname)
        expect(resultUser.surname).toBeOfType('string')
        expect(resultUser.email).toEqual(email)
        expect(resultUser.email).toBeOfType('string')
        expect(resultUser.username).toEqual(username)
        expect(resultUser.username).toBeOfType('string')

        expect(resultUser.rssChannels).toBeType('array')
        expect(resultUser.favs).toBeType('array')

debugger

        expect(resultUser.player.currentEpisode.podcastId.toString()).toEqual(randomPodcast)
        expect(resultUser.player.currentEpisode.position).toEqual(randomPosition)
        expect(resultUser.player.currentEpisode.active).toEqual(randomActive)
    })

    afterAll(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})