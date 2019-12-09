module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createRss: require('./create-rss'),
    listRss: require('./list-user-rss'),
    retrieveRss: require('./retrieve-rss'),
    addToPlaylist: require('./add-podcast-playlist'),
    removeFromPlaylist: require('./remove-podcast-playlist'),
    retrievePlaylist: require('./retrieve-playlist'),
    retrieveFavsList: require('./list-user-favs'),
    listPodcastsByRss: require('./list-podcasts'),
    modifyCurrentEpisode: require('./modify-current-episode')
}
