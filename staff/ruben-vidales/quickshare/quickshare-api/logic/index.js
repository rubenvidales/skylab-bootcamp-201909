module.exports = {
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveUser: require('./retrieve-user'),
    listUserFavs: require('./list-user-favs'),
    toogleFavPodcast: require('./toogle-fav-podcast'),
    listUserRss: require('./list-user-rss'),
    createRss: require('./create-rss'),
    retrieveRss: require('./retrieve-rss'),
    listRss: require('./list-rss'),
    createPodcast: require('./create-podcast'),
    retrievePodcast: require('./retrieve-podcast'),
    listPodcastsByRss: require('./list-podcasts'),
    addPodcastToPlaylist: require('./add-podcast-playlist'),
    removePodcastToPlaylist: require('./remove-podcast-playlist'),
    retrievePlaylist: require('./retrieve-playlist'),
    modifyCurrentEpisode: require('./modify-current-episode')
}
