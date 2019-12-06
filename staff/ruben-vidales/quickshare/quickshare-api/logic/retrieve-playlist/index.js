const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User, Podcast } } = require('quickshare-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        if(user.player){
            await Podcast.populate(user, {path:'player.playlist'})
            const { player:{playlist} } = user.toObject()

            playlist.forEach(elem => {
                elem.id = elem._id.toString()
                delete elem._id
                delete elem.__v
            })
            return playlist
        }
        else{
            return []
        }
    })()
}