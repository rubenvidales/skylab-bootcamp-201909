const { validate, errors: { ContentError, NotFoundError } } = require('tasks-util')
const { ObjectId, models: { User, Task } } = require('tasks-data')

module.exports = function (userId, title, description) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)

    return (async ()=>{
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`User with id ${userId} not found`)

        const task = await Task.create({ user: userId, title, description })
        return task.id
    })()
}