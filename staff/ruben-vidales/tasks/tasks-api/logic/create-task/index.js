const validate = require('../../utils/validate')
const tasks = require('../../data/tasks')('test')
const uuid = require('uuid/v4')
const { ConflictError } = require('../../utils/errors')

module.exports = function (user, title, description, status) {
    validate.string(user)
    validate.string.notVoid('user', name)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)
    validate.string(status)
    validate.string.notVoid('status', status)


    return new Promise((resolve, reject) => {
        const id = uuid()
        const insertedTask = {id, user, title, description, status, date: new Date()}

        tasks.data.push(task)

        tasks.persist().then(resolve(task.id)).catch(reject)
    })
}