const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function (userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)

    const client = database()

    return client.connect()
        .then(connection => {
            const db = connection.db()
            const users = db.collection('users')
            const tasks = db.collection('tasks')


            return users.findOne({ _id: ObjectId(userId) })
                .then(user => {
                    if (!user) throw new NotFoundError(`User with id: ${userId} not found`)

                    return tasks.find({ user: ObjectId(userId) }).toArray()
                        .then(_tasks => {
                            _tasks.forEach( task => {
                                const last = new Date
                                tasks.updateOne({ _id: task._id }, { $set: { lastAccess: last } })

                                //Data sanitizing
                                task.id = task._id.toString()
                                task.user = task.user.toString()
                                task.lastAccess = last
                                delete task._id
                            })
                            return _tasks
                        })
                })
        })
}