const validate = require('../../utils/validate')
const { CredentialsError } = require('../../utils/errors')
const { models: { User } } = require('../../data')

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const user = await User.findOne({ username, password })

        if (!user) throw new CredentialsError('wrong credentials')

        user.lastAccess = new Date

        await user.save()

        return user.id
    })()
}