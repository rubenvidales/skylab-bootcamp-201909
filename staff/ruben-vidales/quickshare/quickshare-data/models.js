const { model } = require('mongoose')
const { user, rsschannel, podcast } = require('./schemas')

module.exports = {
    User: model('User', user),
    RSSChannel: model('RSSChannel', rsschannel),
    Podcast: model('Podcast', podcast)
}