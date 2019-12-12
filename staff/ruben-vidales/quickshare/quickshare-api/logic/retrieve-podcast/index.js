const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { Podcast } } = require('quickshare-data')

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