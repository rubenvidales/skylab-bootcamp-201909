const validate = require('../../utils/validate')
const users = require('../../data/users.json')
const fs = require('fs')
const path = require('path')

module.exports = function(name, surname, email, username, password) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return new Promise((resolve, reject) => {
        users.push({ name, surname, email, username, password })

        // logic rules!!!!

        fs.writeFile(path.join(__dirname, '../../data/users.json'), JSON.stringify(users), error => error? reject(error) : resolve())
    })
}