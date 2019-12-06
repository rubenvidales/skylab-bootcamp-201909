const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User, Player, Podcast } } = require('quickshare-data')

module.exports = function (userId, podcastId, position, active) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    if (podcastId) {
        validate.string(podcastId)
        validate.string.notVoid('podcastId', podcastId)
        if (!ObjectId.isValid(podcastId)) throw new ContentError(`${podcastId} is not a valid id`)
    }
    if (position) {
        validate.number(position)
    }
    if (active) {
        validate.boolean(active)
    }

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        if (podcastId !== undefined) {
            if (podcastId.length === 0) {
                await User.updateOne({ _id: ObjectId(userId) }, { $unset: { "player.currentEpisode.podcastId": "" } })
            }
            else {
                user.player.currentEpisode.podcastId = podcastId
            }
        }
        position && (user.player.currentEpisode.position = position)
        if (active !== undefined) {
            user.player.currentEpisode.active = active
        }

        await user.save()

        await Podcast.populate(user,{path:'player.currentEpisode.podcastId'})

        return user.player
    })()
}