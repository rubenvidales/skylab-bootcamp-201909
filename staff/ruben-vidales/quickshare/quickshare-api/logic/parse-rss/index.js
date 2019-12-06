const { converter, validate, errors: { ConflictError } } = require('quickshare-util')
const { models: { User, RSSChannel, Podcast, Player } } = require('quickshare-data')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const util = require('util')
let Parser = require('rss-parser')
let parser = new Parser()
const readFile = util.promisify(fs.readFile)

module.exports = function (url) {
    validate.string(url)
    validate.string.notVoid('url', url)
    validate.url(url)

    return (async () => {
        let rawFeed = await parser.parseURL(url)
        let items = []
        let feed = {
            title: rawFeed.title,
            url: rawFeed.feedUrl,
            description: JSON.parse(rawFeed.description.replace(/&quot;/g,'"')),
            imageUrl: rawFeed.itunes.image,
            language: rawFeed.language,
            items: []
        }

        rawFeed.items.forEach(item => {
            let _item = {
                title: item.title,
                url: item.enclosure.url,
                description: unescape(item.content),
                imageUrl: rawFeed.itunes.image,
                publicationDate: item.pubDate,
                duration: converter.stringToSeconds(item.itunes.duration)
            }
            feed.items.push(_item)
        })
        return feed
    })()
}
