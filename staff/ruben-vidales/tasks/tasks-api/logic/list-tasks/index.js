const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const database = require('../../utils/database')
const {ObjectId} = database

module.exports = function (userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)

    const client = database()

    return client.connect()
        .then(connection => {
            const db = connection.db()
            const users = db.collection('users')
            const tasks = db.collection('tasks')


            return users.findOne({ _id: ObjectId(userId)})
                .then( user => {
                    if(!user) throw new NotFoundError(`User with id: ${userId} not found`)

                    return tasks.find().toArray()
                    //TODO
                        .then()
                })
        })

    /*
    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.id === id)

        if (!user) return reject(new NotFoundError(`user with id ${id} not found`))

        const _tasks = tasks.data.filter(({ user }) => user === id)

        _tasks.forEach(task => task.lastAccess = new Date)

        tasks.persist().then(() => resolve(_tasks)).catch(reject)
    })
    */
}