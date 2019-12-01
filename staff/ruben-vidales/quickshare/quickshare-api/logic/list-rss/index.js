const { validate, errors: { NotFoundError, ContentError, ConflictError } } = require('quickshare-util')
const { ObjectId, models: { RSSChannel, Podcast } } = require('quickshare-data')

module.exports = function () {
    return (async () => {
        const rss = await RSSChannel.find()
        return rss
    })()
}