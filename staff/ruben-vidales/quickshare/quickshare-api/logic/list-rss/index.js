const { models: { RSSChannel } } = require('quickshare-data')

module.exports = function () {
    return (async () => {
        const rssChannels = await RSSChannel.find().lean()

        rssChannels.forEach(rssChannel => {
            rssChannel.id = rssChannel._id.toString()
            delete rssChannel._id
            delete rssChannel.__v
        })

        return rssChannels
    })()
}