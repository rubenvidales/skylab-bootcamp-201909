const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

/**
 * List the podcasts by rss id
 * 
 * @param {ObjectId} rssId
 * 
 * @returns {[Podcast]} podcasts
 * @author Ruben Vidales
 * @version 1.0.0
 */
module.exports = function (rssId) {
    validate.string(rssId)
    validate.string.notVoid('rssId', rssId)
    if (!ObjectId.isValid(rssId)) throw new ContentError(`${rssId} is not a valid id`)

    return (async () => {
        const rss = await RSSChannel.findById(rssId)
        if (!rss) throw new NotFoundError(`RSS channel with id ${rssId} not found`)

        const podcasts = await Podcast.find({ rssChannel: rssId }).sort('-publicationDate').lean()

        podcasts.forEach(podcast => {
            podcast.id = podcast._id.toString()
            delete podcast._id
            delete podcast.__v
        })
        return podcasts
    })()
}