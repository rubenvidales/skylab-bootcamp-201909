const { validate, errors: { NotFoundError } } = require('tasks-util')
const { ObjectId, models: { User, Task } } = require('tasks-data')

module.exports = function (id, title, description) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(title)
    validate.string.notVoid('title', title)

    validate.string(description)
    validate.string.notVoid('description', description)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const task = await Task.create({ user: id, title, description })

        return task.id
    })()
}