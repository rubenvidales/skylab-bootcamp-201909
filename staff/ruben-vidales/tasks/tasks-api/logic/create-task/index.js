const validate = require('../../utils/validate')
const users = require('../../data/users')()
const tasks = require('../../data/tasks')()
const uuid = require('uuid/v4')
const { NotFoundError } = require('../../utils/errors')

module.exports = function (userId, title, description) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)

    return new Promise((resolve, reject) => {
        const user = user.data.find(user => user.id === id)

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

        tasks.persist().then(()=> resolve(task.id)).catch(reject)
    })
}