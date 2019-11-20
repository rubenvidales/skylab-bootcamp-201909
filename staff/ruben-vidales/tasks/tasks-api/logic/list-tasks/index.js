const validate = require('../../utils/validate')
const { NotFoundError, ContentError } = require('../../utils/errors')
const { ObjectId, models: { User, Task } } = require('../../data')

module.exports = function (userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    return ( async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`User with id: ${userId} not found`)

        await Task.updateMany({ user: userId}, { $set: { lastAccess: new Date } })

        const tasks = await Task.find({ user: userId}, { __v: 0}).lean()

        tasks.forEach(task => {
            task.id = task._id.toString()
            delete task._id

            task.user = userId
        })
        return tasks
    })()
}