const validate = require('../../utils/validate')
const users = require('../../data/users')()
const { CredentialsError } = require('../../utils/errors')

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.username === username && user.password === password)

        if (!user) return reject(new CredentialsError('wrong credentials'))

        user.lastAccess = new Date

        users.persist()
            .then(() => resolve(user.id))
            .catch(reject)
    })
}