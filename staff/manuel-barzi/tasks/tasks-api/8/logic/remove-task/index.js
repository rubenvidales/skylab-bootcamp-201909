const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('tasks-util')
const { ObjectId, models: { User, Task } } = require('tasks-data')

module.exports = function (id, taskId) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(taskId)
    validate.string.notVoid('task id', taskId)
    if (!ObjectId.isValid(taskId)) throw new ContentError(`${taskId} is not a valid task id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const task = await Task.findById(taskId)

        if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)

        if (task.user.toString() !== id.toString()) throw new ConflictError(`user with id ${id} does not correspond to task with id ${taskId}`)

        await Task.deleteOne({ _id: ObjectId(taskId) })
    })()
}
