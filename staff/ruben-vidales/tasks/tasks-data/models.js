const { model } = require('mongoose')
const { user, task } = require('./schemas')

module.exports = {
    User: model('User', user),
    Task: model('Task', task)
}