const validate = require('../../utils/validate')
const { NotFoundError, ContentError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function (userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    const client = database()

    return client.connect()
        .then(connection => {
            const db = connection.db()
            const users = db.collection('users')
            const tasks = db.collection('tasks')


            return users.findOne({ _id: ObjectId(userId) })
                .then(user => {
                    if (!user) throw new NotFoundError(`User with id: ${userId} not found`)

                    return tasks.find({ user: user._id }).toArray()
                })
                .then(_tasks => {
                    const lastAccess = new Date
                    const updates = _tasks.map(({ _id }) => tasks.updateOne({ _id }, { $set: { lastAccess } }))

                    return Promise.all(updates)
                        .then(() => {
                            _tasks.forEach(task => {
                                task.id = task._id.toString()
                                delete task._id

                                task.user = userId
                                task.lastAccess = lastAccess

                            })
                            return _tasks
                        })
                })
        })
}