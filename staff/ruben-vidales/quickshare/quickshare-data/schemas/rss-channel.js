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
    description: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    language: {
        type: String,
    },
    podcasts: {
        type: [{
            type: ObjectId,
            ref: 'Podcast'
        }]
    }
})