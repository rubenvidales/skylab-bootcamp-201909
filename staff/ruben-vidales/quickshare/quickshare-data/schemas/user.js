const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    rssChannels: {
        type: [{
            type: ObjectId,
            ref: 'RSSChannel'
        }]
    },
    favs: {
        type: [{
            type: ObjectId,
            ref: 'Podcast'
        }]
    },
    player: Player
})