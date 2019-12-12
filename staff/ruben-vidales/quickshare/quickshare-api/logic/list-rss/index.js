const { models: { RSSChannel } } = require('quickshare-data')

/**
 * List the all the rss channels 
 * 
 * @returns {[RSSChannel]} rssChannels
 * @author Ruben Vidales
 * @version 1.0.0
 */
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