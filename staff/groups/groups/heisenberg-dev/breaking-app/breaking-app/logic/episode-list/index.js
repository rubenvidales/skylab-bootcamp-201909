/**
 * 
 * @param {String} season the number of season that you pick
 * @param {Function} callback the call that recovers the episodes of the season you select
 */

function listEpisodes(season, callback) {
    if (typeof season !== 'string') throw new TypeError(season + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', undefined, 'https://www.breakingbadapi.com/api/episodes/', undefined, (result) => {
        if (result.name == 'error') return callback(new Error('Incorrect query'))
        if (result.length === 0) return callback(new Error('No result for this query'))

        let breaking = []
        result.forEach(function (episode) {
            if (episode.series === 'Breaking Bad' && episode.season.trim() === season) {

                const url = 'https://api.themoviedb.org/3/tv/1396/season/' + episode.season.trim() + '/episode/' + episode.episode.trim() + '?api_key=df85ebd060b729d2c1cd44580c111dea'

                call('GET', undefined, url, undefined, result2 => {
                    if (result.name == 'error') return callback(new Error('Incorrect query'))
                    if (result.length === 0) return callback(new Error('No result for this query'))

                    breaking.push(episode)
                    breaking.sort((a, b) => a.episode_id - b.episode_id)

                    if (result2.still_path) episode.imageUrl = 'https://image.tmdb.org/t/p/original' + result2.still_path
                    if (result2.overview) episode.overview = result2.overview
                    callback(undefined, breaking)
                })


            }
        })
    })
}