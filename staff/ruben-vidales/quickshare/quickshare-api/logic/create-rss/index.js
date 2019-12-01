const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel } } = require('quickshare-data')

module.exports = function (userId, title, url, description, imageUrl, language) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(title)
    validate.string.notVoid('title', title)

    validate.string(url)
    validate.string.notVoid('url', url)
    validate.url(url)

    validate.string(description)
    validate.string.notVoid('description', description)

    validate.string(imageUrl)
    validate.string.notVoid('imageUrl', imageUrl)
    validate.url(imageUrl)

    validate.string(language)
    validate.string.notVoid('language', language)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)
        
        let rss = await RSSChannel.findOne({url})
        if(!rss){
            rss = await RSSChannel.create({title, url, description, imageUrl, language})
        }
        const result = await User.updateOne({ _id: userId }, { $addToSet: {rssChannels: rss.id} })

        return rss.id
    })()
}
