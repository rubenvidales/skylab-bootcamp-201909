const validate = require('../../utils/validate')
const { ObjectId, models: { User, Task } } = require('../../data')
const { NotFoundError, ConflictError } = require('../../utils/errors')

module.exports = function (id, taskId) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(taskId)
    validate.string.notVoid('task id', taskId)
    if (!ObjectId.isValid(taskId)) throw new ContentError(`${taskId} is not a valid task id`)

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            return Task.findById(taskId)
        })
        .then(task => {
            if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)

            if (task.user.toString() !== id.toString()) throw new ConflictError(`user with id ${id} does not correspond to task with id ${taskId}`)

            return Task.deleteOne({ _id: ObjectId(taskId) })
        })
        .then(() => { })
}