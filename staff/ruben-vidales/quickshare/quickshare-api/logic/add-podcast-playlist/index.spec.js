require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const addPodcastToPlaylist = require('.')
const { random } = Math
const { database, ObjectId, models: { User, RSSChannel, Podcast, Player } } = require('quickshare-data')

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

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})