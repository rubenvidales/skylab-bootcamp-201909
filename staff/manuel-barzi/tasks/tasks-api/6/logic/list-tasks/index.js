require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const validate = require('../../utils/validate')
const database = require('../../utils/database')
const { NotFoundError, ContentError } = require('../../utils/errors')

const { ObjectId } = database

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    const client = database()

    return client.connect()
        .then(db => {
            const users = db.collection('users')
            const tasks = db.collection('tasks')

            return users.findOne({ _id: ObjectId(id) })
                .then(user => {
                    if (!user) throw new NotFoundError(`user with id ${id} not found`)

                    return tasks.find({ user: user._id }).toArray()
                })
                .then(_tasks => {
                    const lastAccess = new Date

                    return tasks.updateMany({ user: ObjectId(id) }, { $set: { lastAccess } })
                        .then(() => {
                            _tasks.forEach(task => {
                                task.id = task._id.toString()
                                delete task._id

                                task.user = id

                                task.lastAccess = lastAccess
                            })

                            return _tasks
                        })
                })
        })
}