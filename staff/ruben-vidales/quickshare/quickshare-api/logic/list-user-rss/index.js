const { validate, errors: { NotFoundError, ContentError, ConflictError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel } } = require('quickshare-data')

/**
 * List the podcasts added to rss channels of the user
 * 
 * @param {ObjectId} userId 
 * 
 * @returns {[RSSChannel]} rssChannels 
 * @author Ruben Vidales
 * @version 1.0.0
 */
module.exports = function (userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        await RSSChannel.populate(user, { path: 'rssChannels' })

        //return user.rssChannels
        const { rssChannels } = user.toObject()

        rssChannels.forEach(channel => {
            channel.id = channel._id.toString()
            delete channel._id
            delete channel.__v
        })

        return rssChannels
    })()
}