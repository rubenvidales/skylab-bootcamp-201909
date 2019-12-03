const { validate, errors: { CredentialsError } } = require('quickshare-util')
const { models: { User } } = require('quickshare-data')
const bcrypt = require('bcryptjs')

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const user = await User.findOne({ username })

        if (!user || !(await bcrypt.compare(password, user.password))) throw new CredentialsError('wrong credentials')

        user.lastAccess = new Date

        await user.save()

        return user.id
    })()
}
