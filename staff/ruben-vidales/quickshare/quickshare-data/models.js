const { model } = require('mongoose')
const { user, task } = require('./schemas')

module.exports = {
    User: model('User', user),
    RSSChannel: model('RSSChannel', rsscannel)
}