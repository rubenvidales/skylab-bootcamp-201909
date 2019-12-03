const { validate, errors: { NotFoundError, ContentError, ConflictError } } = require('quickshare-util')
const { ObjectId, models: { RSSChannel, Podcast } } = require('quickshare-data')

module.exports = function () {
    return (async () => {
        const rssChannels = await RSSChannel.find().lean()

/*         const rssChannels = rss.toObject()
*/
        rssChannels.forEach(rssChannel => {
            rssChannel.id = rssChannel._id.toString()
            delete rssChannel._id
            delete rssChannel.__v
        })

        return rssChannels
    })()
}