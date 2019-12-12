const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { Podcast } } = require('quickshare-data')

/**
 * Get the information of a podcast
 * 
 * @param {ObjectId} id
 * 
 * @returns {Podcast} podcast 
 * @author Ruben Vidales
 * @version 1.0.0
 */
module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const podcast = await Podcast.findById(id)
        if (!podcast) throw new NotFoundError(`podcast with id ${id} not found`)

        const { title, url, rssChannel, description, imageUrl, publicationDate, duration } = podcast.toObject()

        return { id, title, url, rssChannel, description, imageUrl, publicationDate, duration }
    })()
}