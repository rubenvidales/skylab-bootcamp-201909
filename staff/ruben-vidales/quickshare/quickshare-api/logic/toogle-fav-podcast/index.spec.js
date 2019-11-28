require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const toogleFavPodcast = require('.')
const { random } = Math
const { database, ObjectId, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

describe('logic - toogle favs', () => {
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
        const randomPodcast = '5de050018797e967d7a14223';

        const result = await toogleFavPodcast(id, randomPodcast)

        expect(result).to.exist
        expect(result.length).to.equal(podcastIds.length + 1)
        expect(result).to.include(randomPodcast)
    })

    it('when fav already exists: should succeed on correct user and podcast data', async () => {
        //Take a random existing podcast in user
        const randomPodcast = podcastIds[Math.floor(Math.random() * podcastIds.length)];

        const result = await toogleFavPodcast(id, randomPodcast)

        expect(result).to.exist
        expect(result.length).to.equal(podcastIds.length - 1)
        expect(result).to.not.include(randomPodcast)
    })


    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})