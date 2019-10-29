function retrieveEpisodes(id, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function')

    call('GET', undefined, 'https://www.breakingbadapi.com/api/episodes/' + id, undefined, (result) => {
        if (result.name == 'error') return callback(new Error('Incorrect query'))
        if (result.length === 0) return callback(new Error('No result for this query'))

        result.map(function (episode) {
            if (episode.series === 'Breaking Bad') {
                callback(undefined, result[0])
            }
            else {
                callback(new Error('No result for this query'))
            }
        })
    })
}