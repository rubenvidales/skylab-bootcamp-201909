const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const { ObjectId, models: { User, Task } } = require('../../data')

module.exports = function (id, title, description) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(title)
    validate.string.notVoid('title', title)

    validate.string(description)
    validate.string.notVoid('description', description)

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            return Task.create({ user: id, title, description })
        })
        .then(task => task.id)
}