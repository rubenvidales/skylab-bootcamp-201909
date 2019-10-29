function listEpisodes(season, callback) {
    if (typeof season !== 'string') throw new TypeError(season + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', undefined, 'https://www.breakingbadapi.com/api/episodes/', undefined, (result) => {
        if (result.name == 'error') return callback(new Error('Incorrect query'))
        if (result.length === 0) return callback(new Error('No result for this query'))

        let breaking = []
        result.map(function (episode) {
            if (episode.series === 'Breaking Bad' && episode.season.trim() === season) {
                breaking.push(episode)
            }
        })
        callback(undefined, breaking)
    })
}