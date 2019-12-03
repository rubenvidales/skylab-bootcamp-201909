const { validate, errors: { NotFoundError, ContentError, ConflictError } } = require('quickshare-util')
const { ObjectId, models: { User, Podcast } } = require('quickshare-data')

module.exports = function(userId, podcastId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(podcastId)
    validate.string.notVoid('podcastId', podcastId)
    if (!ObjectId.isValid(podcastId)) throw new ContentError(`${podcastId} is not a valid id`)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const podcast = await Podcast.findById(podcastId)
        if (!podcast) throw new NotFoundError(`podcast with id ${podcastId} not found`)

        const index = user.favs.findIndex(fav => fav._id == podcastId)

        index > -1 ? user.favs.splice(index, 1) : user.favs.push(podcastId)

        await user.save()
        await Podcast.populate(user, {path: 'favs'})

        const { favs } = user.toObject()

        favs.forEach(fav => {
          fav.id = fav._id.toString()
          delete fav._id   
          delete fav.__v           
        })

        return favs
    })()

}