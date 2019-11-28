const { validate, errors: { NotFoundError, ContentError, ConflictError } } = require('quickshare-util')
const { ObjectId, models: { User, Podcast } } = require('quickshare-data')

module.exports = function(userId){
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)
        //Autor.populate(libros, {path: "autor"}
        await Podcast.populate(user, {path: 'favs'})
        
        return user.favs
    })()
}