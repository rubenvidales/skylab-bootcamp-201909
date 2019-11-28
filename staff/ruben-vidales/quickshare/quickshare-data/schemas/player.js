const { ObjectId, Schema } = require('mongoose')

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