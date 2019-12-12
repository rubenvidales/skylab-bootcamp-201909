const { converter, validate, errors: { ConflictError } } = require('quickshare-util')
const { models: { User, RSSChannel, Podcast, Player } } = require('quickshare-data')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const util = require('util')
let Parser = require('rss-parser')
let parser = new Parser()

/**
 * Parse the url file (RSS like XML) and returns the JSON sanitized object  
 * 
 * @param {String} url 
 * 
 * @returns {String} feed 
 * @author Ruben Vidales
 * @version 1.0.0
 */
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
            description: rawFeed.description,
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
