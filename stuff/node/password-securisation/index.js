const bcrypt = require('bcryptjs')

const salt = 10

const password = '12345'

const user = {};

(async () => {
    try {
        // WHEN registering
        const hash = await bcrypt.hash(password, salt)

        debugger

        user.password = hash

        // TODO user.save()

        // WHEN authenticating

        // TODO User.findOne({ username }).then(user => user.password ...)

        const valid = await bcrypt.compare(password + '-hack', user.password)

        debugger

        // TODO if (valid) { return id } else throw Error('invalid password')
    } catch (error) {
        debugger
    }
})()