const { validate, errors: { NotFoundError, ContentError } } = require('quickshare-util')
const { ObjectId, models: { User } } = require('quickshare-data')

module.exports = function (userId, currentChanges) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    //TODO
}