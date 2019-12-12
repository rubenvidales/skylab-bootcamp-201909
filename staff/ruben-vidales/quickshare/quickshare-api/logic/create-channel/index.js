const { converter, validate, errors: { ConflictError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel, Podcast, Player } } = require('quickshare-data')
const bcrypt = require('bcryptjs')
const parseRss = require('../parse-rss')
const createRss = require('../create-rss')
const createPodcast = require('../create-podcast')

/**
 * Complete process to create a Channel (fist parse the file, then create the channel and the podcasts)
 * 
 * @param {ObjectId} userId 
 * @param {String} url
 * 
 * @returns {RSSChannel} rss 
 * @author Ruben Vidales
 * @version 1.0.0
 */
module.exports = function (userId, url) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(url)
    validate.string.notVoid('url', url)

    return (async () => {
        const feedObject = await parseRss(url)

        const rss = await createRss(userId, feedObject.title, feedObject.url, feedObject.description, feedObject.imageUrl, feedObject.language)

        const ps = feedObject.items.map(async item => {
            await createPodcast(item.title, item.url, rss.id, item.description, item.publicationDate, item.duration)
        })
        await Promise.all(ps)

        return rss
    })()
}