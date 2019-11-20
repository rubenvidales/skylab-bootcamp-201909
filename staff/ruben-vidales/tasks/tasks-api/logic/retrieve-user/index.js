const validate = require('../../utils/validate')
const { ObjectId, models: { User } } = require('../../data')
const { NotFoundError, ContentError } = require('../../utils/errors')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        debugger
        let user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        user.lastAccess = new Date

        user = await user.save()

        user = user.toObject()
        user.id = id

        delete user._id
        delete user.password

        return user

    })()
}