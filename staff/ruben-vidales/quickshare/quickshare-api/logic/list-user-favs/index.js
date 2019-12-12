const { validate, errors: { NotFoundError, ContentError, ConflictError } } = require('quickshare-util')
const { ObjectId, models: { User, Podcast } } = require('quickshare-data')

/**
 * List the podcasts added to the user's favs  
 * 
 * @param {ObjectId} userId 
 * 
 * @returns {[ObjectId]} favs 
 * @author Ruben Vidales
 * @version 1.0.0
 */
module.exports = function(userId){
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

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