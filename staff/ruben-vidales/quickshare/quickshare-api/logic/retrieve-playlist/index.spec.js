require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrievePlaylist = require('.')
const { errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { database, models: { User, RSSChannel, Podcast, Player } } = require('quickshare-data')

describe('logic - retrieve playlist', () => {
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

    it('should succeed on correct user id and empty playlist', async () => {
        const playlist = await retrievePlaylist(id)
        
        expect(playlist).to.exist
        expect(playlist).to.be.an('array')
        expect(playlist).to.have.lengthOf(0)
    })

    it('should succeed on correct user id and playlist with podcasts', async () => {
        //Save the 
        user.player = {playlist:podcastIds}
        await user.save()

        const playlist = await retrievePlaylist(id)
        expect(playlist).to.exist
        expect(playlist).to.be.an('array')
        expect(playlist).to.have.lengthOf(10)
        
        playlist.forEach(podcast => {
            expect(podcast).to.exist
            expect(podcast.id).be.oneOf(podcastIds)
        })
    })

    it('should fail on incorrect user id', async () => {
        id = 'wrong'
        expect(()=>{
            retrievePlaylist(id)
        }).to.throw(ContentError, `${id} is not a valid id`)
    })

    after(() => Promise.all([User.deleteMany(), RSSChannel.deleteMany(), Podcast.deleteMany()]).then(database.disconnect))
})
