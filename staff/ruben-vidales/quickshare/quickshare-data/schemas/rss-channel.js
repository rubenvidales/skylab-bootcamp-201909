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
    image_url: {
        type: String
    }
})