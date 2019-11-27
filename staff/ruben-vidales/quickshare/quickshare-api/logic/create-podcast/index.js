const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User, RSSChannel, Podcast } } = require('quickshare-data')

module.exports = function (title, url, rssId, description, publicationDate, duration) {
        //TODO: Validate urls
        validate.string(title)
        validate.string.notVoid('title', title)
    
        validate.string(url)
        validate.string.notVoid('url', url)

        validate.string(rssId)
        validate.string.notVoid('rssId', rssId)
        if (!ObjectId.isValid(rssId)) throw new ContentError(`${rssId} is not a valid id`)
    
        validate.string(description)
        validate.string.notVoid('description', description)
    
        //validate.string(publicationDate)
        //validate.string.notVoid('publicationDate', publicationDate)
    
        //validate.string(duration)
        //validate.string.notVoid('duration', duration)
    
        return (async () => {
            const rss = await RSSChannel.findById(rssId)
            if (!rss) throw new NotFoundError(`RSS Channel with id ${rssId} not found`)
            
            let podcast = await Podcast.findOne({url})
            if(!podcast){
                podcast = await Podcast.create({title, url, rssId, description, publicationDate, duration})
            }
            return podcast.id
        })()
    }
