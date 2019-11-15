const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function (id, title, description) {
    validate.string(id)
    validate.string.notVoid('id', id)
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

            return users.findOne({ _id: ObjectId(id) })
                .then(user => {
                    if (!user) throw new NotFoundError(`user with id ${id} not found`)

                    const task = {
                        user: ObjectId(id),
                        title,
                        description,
                        status: 'TODO',
                        date: new Date
                    }

                    return tasks.insertOne(task)
                })
                .then(result => {
                    if (!result.insertedCount) throw new Error('failed to create task')

                    return result.insertedId.toString()
                })
        })
}