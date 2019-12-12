const { validate, errors: { ConflictError } } = require('quickshare-util')
const { models: { User, Player } } = require('quickshare-data')
const bcrypt = require('bcryptjs')

/**
 * Register the user
 * 
 * @param {String} name
 * @param {String} surname
 * @param {String} email
 * @param {String} username
 * @param {String} password
 * 
 * @author Manuel Barzi/Ruben Vidales
 * @version 1.0.0
 */
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

    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, username, password:hash, player: new Player() })
    })()
}
