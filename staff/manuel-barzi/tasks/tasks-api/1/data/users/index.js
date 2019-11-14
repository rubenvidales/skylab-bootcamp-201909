const fs = require('fs').promises
const path = require('path')
const validate = require('../../utils/validate')

let manager

module.exports = function (name = 'index') {
    validate.string(name)
    validate.string.notVoid('name', name)

    return manager ? manager : manager = {
        load() {
            return this.users ? Promise.resolve() : fs.readFile(path.join(__dirname, `./${name}.json`))
                .then(json => JSON.parse(json))
                .then(users => { this.users = users })
        },

        persist() {
            return fs.writeFile(path.join(__dirname, `./${name}.json`), JSON.stringify(this.users, undefined, 4))
        },

        get data() {
            return this.users
        }
    }
}