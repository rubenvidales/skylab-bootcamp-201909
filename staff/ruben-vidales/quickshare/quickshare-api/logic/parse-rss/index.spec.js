require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const parseRss = require('.')
const { errors: { ContentError, NotFoundError } } = require('quickshare-util')

describe('logic - Parse RSS', () => {
    it('should succeed on correct url', async () => {
        const validUrl = 'https://www.ivoox.com/podcast-viviendo-del-cuento_fg_f1566301_filtro_1.xml'
        const feed = await parseRss(validUrl)

        expect(feed).to.exist

        expect(feed.title).to.exist
        expect(feed.title).to.be.a('string')
        expect(feed.title).to.have.length.greaterThan(0)

        expect(feed.url).to.exist
        expect(feed.url).to.be.a('string')
        expect(feed.url).to.have.length.greaterThan(0)

        expect(feed.description).to.exist
        expect(feed.description).to.be.a('string')
        expect(feed.description).to.have.length.greaterThan(0)

        expect(feed.imageUrl).to.exist
        expect(feed.imageUrl).to.be.a('string')
        expect(feed.imageUrl).to.have.length.greaterThan(0)

        expect(feed.language).to.exist
        expect(feed.language).to.be.a('string')
        expect(feed.language).to.have.length.greaterThan(0)

        expect(feed.items).to.exist
        expect(feed.items).to.be.an('array')
        expect(feed.items).to.have.length.greaterThan(0)

        feed.items.forEach(item => {
            expect(item.title).to.exist
            expect(item.title).to.be.a('string')
            expect(item.title).to.have.length.greaterThan(0)

            expect(item.url).to.exist
            expect(item.url).to.be.a('string')
            expect(item.url).to.have.length.greaterThan(0)

            expect(item.description).to.exist
            expect(item.description).to.be.a('string')
            expect(item.description).to.have.length.greaterThan(0)

            expect(item.imageUrl).to.exist
            expect(item.imageUrl).to.be.a('string')
            expect(item.imageUrl).to.have.length.greaterThan(0)
        })
    })

    it('should succeed on correct url', async () => {
        const notValidUrl = 'incorrect-formed-url'
        
        try {
            const feed = await parseRss(notValidUrl)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ContentError)

            const { message } = error
            expect(message).to.equal(`${notValidUrl} is not an url`)
        }
    })

})