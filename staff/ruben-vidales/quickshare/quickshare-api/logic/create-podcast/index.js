const { validate, errors: { NotFoundError, ContentError, ConflictError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

module.exports = function (title, url, rssId, description, publicationDate, duration) {
    //TODO: Validate urls
    validate.string(title)
    validate.string.notVoid('title', title)

    validate.string(url)
    validate.string.notVoid('url', url)
    validate.url(url)

    validate.string(rssId)
    validate.string.notVoid('rssId', rssId)
    if (!ObjectId.isValid(rssId)) throw new ContentError(`${rssId} is not a valid id`)

    validate.string(description)
    validate.string.notVoid('description', description)

    publicationDate = new Date(publicationDate+':00.000+00:00')
    validate.date(publicationDate)

    validate.number(duration)

    return (async () => {
        const rss = await RSSChannel.findById(rssId)
        if (!rss) throw new NotFoundError(`RSS Channel with id ${rssId} not found`)

        let podcast = await Podcast.findOne({ url })
        if (podcast) throw new ConflictError(`podcast with url ${url} already exists`)

        podcast = await Podcast.create({ title, url, rssChannel: rssId, description, publicationDate, duration })
        return podcast.id
    })()
}
