const validate = require('../../utils/validate')
const users = require('../../data/users')
const { NotFoundError } = require('../../utils/errors')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id)

        if (!user) return reject(new NotFoundError(`user with id ${id} not found`))

        const { id: _id, name, surname, email, username } = user

        resolve({ id: _id, name, surname, email, username })
    })
}