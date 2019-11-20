const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('tasks-util')
const { ObjectId, models: { User, Task } } = require('tasks-data')

module.exports = function (userId, taskId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(taskId)
    validate.string.notVoid('task id', taskId)
    if (!ObjectId.isValid(taskId)) throw new ContentError(`${taskId} is not a valid task id`)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const task = await Task.findById(taskId)

        if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)

        if (task.user.toString() !== userId.toString()) throw new ConflictError(`user with id ${userId} does not correspond to task with id ${taskId}`)

        await Task.deleteOne({ _id: ObjectId(taskId) })
    })()
}