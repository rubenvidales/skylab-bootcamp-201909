const validate = require('../../utils/validate')
const { ObjectId, models: { User, Task } } = require('../../data')
const { NotFoundError, ConflictError } = require('../../utils/errors')

module.exports = function (id, taskId, title, description, status) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(taskId)
    validate.string.notVoid('task id', taskId)
    if (!ObjectId.isValid(taskId)) throw new ContentError(`${taskId} is not a valid task id`)

    if (title) {
        validate.string(title)
        validate.string.notVoid('title', title)
    }
    if (description) {
        validate.string(description)
        validate.string.notVoid('description', description)
    }
    if (status) {
        validate.string(status)
        validate.string.notVoid('status', status)
        validate.matches('status', status, 'TODO', 'DOING', 'REVIEW', 'DONE')
    }

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const task = await Task.findById(taskId)

        if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)

        if (task.user.toString() !== id.toString()) throw new ConflictError(`user with id ${id} does not correspond to task with id ${taskId}`)

        const update = {}

        title && (update.title = title)
        description && (update.description = description)
        status && (update.status = status)
        update.lastAccess = new Date

        await Task.updateOne({ _id: ObjectId(taskId) }, { $set: update })
    })()
}