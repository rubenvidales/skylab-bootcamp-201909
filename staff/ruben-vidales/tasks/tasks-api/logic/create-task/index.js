const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function (userId, title, description) {
    validate.string(userId)
    validate.string.notVoid('id', userId)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)

    const client = database()

    return client.connect()
        .then(connection => {
            const db = connection.db()

            users = db.collection('users')
            tasks = db.collection('tasks')

            return users.findOne({ _id: ObjectId(userId)})
                .then(user => {
                    if(!user) throw new NotFoundError(`User with id ${userId} not found`)

                    const task = {
                        user: ObjectId(userId),
                        title,
                        description,
                        status: 'TODO',
                        date: new Date
                    }

                    return tasks.insertOne(task)
                })
                .then(result => {
                    if(!result.insertedCount) throw new Error(`Failed to create task`)
                    return result.insertedId.toString()
                })
        })
}