const validate = require('../../utils/validate')
const users = require('../../data/users')()
const tasks = require('../../data/tasks')()
const { NotFoundError } = require('../../utils/errors')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.id === id)

        if (!user) return reject(new NotFoundError(`user with id ${id} not found`))

        const _tasks = tasks.data.filter(({ user }) => user === id)

        _tasks.forEach(task => task.lastAccess = new Date)

        tasks.persist().then(() => resolve(_tasks)).catch(reject)
    })
}