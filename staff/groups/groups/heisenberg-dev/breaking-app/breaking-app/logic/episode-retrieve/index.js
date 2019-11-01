/**
 * 
 * @param {string} id unique code identificate season
 * @param {function} callback return call
 */

function retrieveEpisode(id, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', undefined, 'https://www.breakingbadapi.com/api/episodes/' + id, undefined, result => {
        if (result.name == 'error') return callback(new Error('Incorrect query'))
        if (result.length === 0) return callback(new Error('No result for this query'))

        if (result[0].series === 'Breaking Bad') {

            const url = 'https://api.themoviedb.org/3/tv/1396/season/' + result[0].season.trim() + '/episode/' + result[0].episode.trim() + '?api_key=df85ebd060b729d2c1cd44580c111dea'

            call('GET', undefined, url, undefined, result2 => {
                if (result.name == 'error') return callback(new Error('Incorrect query'))
                if (result.length === 0) return callback(new Error('No result for this query'))

                let episode = result[0];

                if (result2.still_path) episode.imageUrl = 'https://image.tmdb.org/t/p/original' + result2.still_path
                if (result2.overview) episode.overview = result2.overview

                callback(undefined, episode)
            })
        }
        else {
            callback(new Error('No result for this query'))
        }
    })
}