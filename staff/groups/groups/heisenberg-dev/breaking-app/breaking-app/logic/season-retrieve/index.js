/**
 * 
 * @param {Function} callback call the seasons and make them appear
 */

function seasonRetrieve(callback) {

    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
    let count = 1
    let seasons = []

    function seasonNumber(seasonN) {

        call('GET', undefined, `https://api.themoviedb.org/3/tv/1396/season/${seasonN}?api_key=df85ebd060b729d2c1cd44580c111dea`, undefined, result => {
            if (result.status_code === 34) return callback(new NotFoundError('resource not found'))

            seasons.push({
                number: result.season_number,
                air_date: result.air_date,
                overview: result.overview,
                imageUrl: `https://image.tmdb.org/t/p/original${result.poster_path}`
            })
            count++

            if (seasons.length < 5) seasonNumber(count)
            if (seasons.length === 5) callback(undefined, seasons)
        })
    }
    if (!seasons.length) seasonNumber(count)
}