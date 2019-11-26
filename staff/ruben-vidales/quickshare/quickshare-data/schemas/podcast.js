const { Schema } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    rssChannel: {
        type: ObjectId,
        ref: 'RSSChannel'
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: Date
    },
    duration: {
        type: Number,
        default: 0
    }
})