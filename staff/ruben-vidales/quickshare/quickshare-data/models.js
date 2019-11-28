const { model } = require('mongoose')
const { user, rsschannel, podcast, player } = require('./schemas')

module.exports = {
    User: model('User', user),
    RSSChannel: model('RSSChannel', rsschannel),
    Podcast: model('Podcast', podcast),
    Player: model('Player', player)
}