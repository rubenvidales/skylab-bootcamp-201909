const validate = require('../../utils/validate')
const { CredentialsError } = require('../../utils/errors')
const database = require('../../utils/database')

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    const client = database()

    return client.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ username, password })
                .then(user => {
                    if (!user) throw new CredentialsError('wrong credentials')

                    const { _id } = user

                    return users.updateOne({ _id }, { $set: { lastAccess: new Date } })
                        .then(result => {
                            if (!result.modifiedCount) throw Error('could not update user')

                            return _id.toString()
                        })
                })
        })
}