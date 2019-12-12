const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { RSSChannel } } = require('quickshare-data')

/**
 * Get the information of a rss channel
 * 
 * @param {ObjectId} id 
 * 
 * @returns {RSSChannel} rss 
 * @author Ruben Vidales
 * @version 1.0.0
 */
module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const rss = await RSSChannel.findById(id)

        if (!rss) throw new NotFoundError(`Rss channel with id ${id} not found`)

        const { title, url, description, imageUrl, language } = rss.toObject()

        return { id, title, url, description, imageUrl, language  }
    })()
}
