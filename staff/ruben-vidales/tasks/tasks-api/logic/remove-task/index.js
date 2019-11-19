const validate = require('../../utils/validate')
const database = require('../../utils/database')
const { NotFoundError, ConflictError } = require('../../utils/errors')

const { ObjectId } = database

module.exports = function (userId, taskId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(taskId)
    validate.string.notVoid('task id', taskId)
    if (!ObjectId.isValid(taskId)) throw new ContentError(`${taskId} is not a valid task id`)

    const client = database()

    return client.connect()
        .then(connection => {
            const db = connection.db()

            const users = db.collection('users')
            const tasks = db.collection('tasks')

            return users.findOne({ _id: ObjectId(userId)})
                .then(user => {
                    if(!user) throw new NotFoundError(`user with id ${userId} not found`)

                    return tasks.findOne({ _id: ObjectId(taskId)})
                })
                .then(task => {
                    if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)

                    if (task.user.toString() !== userId.toString()) throw new ConflictError(`user with id ${userId} does not correspond to task with id ${taskId}`)

                    return tasks.deleteOne({ _id: ObjectId(taskId)})
                })
                .then(result => {
                    if(!result.deletedCount) throw Error('failed to remove task')
                })
        })
}