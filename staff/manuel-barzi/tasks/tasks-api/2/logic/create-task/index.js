const validate = require('../../utils/validate')
const users = require('../../data/users')()
const tasks = require('../../data/tasks')()
const uuid = require('uuid/v4')
const { NotFoundError } = require('../../utils/errors')

module.exports = function (id, title, description) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)

    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.id === id)

        if (!user) return reject(new NotFoundError(`user with id ${id} not found`))

        const task = {
            id: uuid(),
            user: id,
            title,
            description,
            status: 'TODO',
            date: new Date
        }

        tasks.data.push(task)

        tasks.persist().then(() => resolve(task.id)).catch(reject)
    })
}