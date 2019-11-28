const { ObjectId, Schema } = require('mongoose')
const Player = require('./player')

module.exports = new Schema({
    currentEpisode: {
        podcastId: {
            type: ObjectId,
            ref: 'Podcast'
        },
        position: {
            type: Number,
            default: 0
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    playlist: [{
        type: ObjectId,
        ref: 'Podcast'
    }]
})
