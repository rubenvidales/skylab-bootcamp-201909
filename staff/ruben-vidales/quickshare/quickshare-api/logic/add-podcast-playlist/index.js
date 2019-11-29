const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel } } = require('quickshare-data')

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

        if(user.player){
            const index = user.player.playlist.findIndex(_podcastId => _podcastId == podcastId)
            if(index === -1) user.player.playlist.push(podcastId)
        }
        else{
            user.player = {playlist:[podcastId]}
        } 
        await user.save()
        return user.player.playlist
    })()
}