const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rssChannels: {
        type: [{
            type: ObjectId,
            ref: 'RSSChannel'
        }]
    },
    playlist: {
        type: [{
            type: ObjectId,
            ref: 'Podcast'
        }]
    },
    favs: {
        type: [{
            type: ObjectId,
            ref: 'Podcast'
        }]
    }
})