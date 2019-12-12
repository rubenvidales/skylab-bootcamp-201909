const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel } } = require('quickshare-data')

/**
 * Remove a podcast from the user's playlist and return this  
 * 
 * @param {ObjectId} userId 
 * @param {ObjectId} podcastId
 * 
 * @returns {[ObjectId]} playlist 
 * @author Ruben Vidales
 * @version 1.0.0
 */
module.exports = function (userId, podcastId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(podcastId)
    validate.string.notVoid('podcastId', podcastId)
    if (!ObjectId.isValid(podcastId)) throw new ContentError(`${podcastId} is not a valid id`)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const index = user.player.playlist.findIndex(_podcastId => _podcastId == podcastId)
        if (index > -1) {
            user.player.playlist.splice(index, 1)
        }else{
            throw new NotFoundError(`podcast with id ${podcastId} not found`)
        }

        await user.save()
        return user.player.playlist
    })()
}