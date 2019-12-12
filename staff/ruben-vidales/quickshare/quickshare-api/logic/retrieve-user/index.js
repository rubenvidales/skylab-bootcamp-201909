const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

/**
 * Retrieve the information of user 
 * 
 * @param {ObjectId} id
 * 
 * @returns {User} user
 * @author Manuel Barzi/Ruben Vidales
 * @version 1.0.0
 */
module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        await RSSChannel.populate(user, {path: 'rssChannels'})
        await Podcast.populate(user, {path: 'favs'})

        const playerId = user.player.id
        const { name, surname, email, username, rssChannels, playlist, favs, player } = user.toObject()

        player.id = playerId
        delete player._id

        return { id, name, surname, email, username, rssChannels, playlist, favs, player }
    })()
}
