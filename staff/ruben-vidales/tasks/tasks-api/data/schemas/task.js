const { Schema, ObjectId } = require('mongoose')
const { isEmail } = require('../../utils/validators')
const user = require('./user')

module.exports =  new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'TODO',
        enum: ['TODO', 'DOING', 'REVIEW', 'DONE']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastAccess: {
        type: Date
    }
})