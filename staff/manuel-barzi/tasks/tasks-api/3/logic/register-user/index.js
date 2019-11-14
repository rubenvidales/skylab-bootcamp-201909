const validate = require('../../utils/validate')
const users = require('../../data/users')()
const uuid = require('uuid/v4')
const { ConflictError } = require('../../utils/errors')

module.exports = function (name, surname, email, username, password) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.username === username)

        if (user) return reject(new ConflictError(`user with username ${username} already exists`))

        const id = uuid()

        users.data.push({ id, name, surname, email, username, password })

        users.persist().then(resolve).catch(reject)
    })
}