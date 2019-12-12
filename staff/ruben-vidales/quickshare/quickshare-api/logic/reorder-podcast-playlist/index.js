const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel } } = require('quickshare-data')

module.exports = function (userId, podcastId, movement) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(podcastId)
    validate.string.notVoid('podcastId', podcastId)
    if (!ObjectId.isValid(podcastId)) throw new ContentError(`${podcastId} is not a valid id`)

    validate.number(movement)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const index = user.player.playlist.findIndex(_podcastId => _podcastId == podcastId)
        if (index === -1) throw new NotFoundError(`Podcast with id ${podcastId} in the playlist for the user with id ${userId} not found`)

        let newPosition = index - movement

        if ((newPosition >= 0) && (newPosition < user.player.playlist.length)) {
            let pivotElement = user.player.playlist[newPosition]

            user.player.playlist[newPosition] = podcastId

            user.player.playlist[index] = pivotElement

            await User.updateOne({ _id: ObjectId(userId) }, { $unset: { "player.playlist": "" } })
            await User.updateOne({ _id: ObjectId(userId) }, { $set: { "player.playlist": user.player.playlist } })
        }

        await user.save()
        return user.player.playlist
    })()

}