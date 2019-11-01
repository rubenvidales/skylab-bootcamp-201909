function seasonRetrieve(season, callback) {
    if (typeof season !== 'string') throw new TypeError(season + ' is not a string')
    if (!season.trim().length) throw new ContentError('season is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    const url = `https://api.themoviedb.org/3/tv/1396/season/${season}?api_key=df85ebd060b729d2c1cd44580c111dea`

    call('GET', undefined, url, undefined, (result) => {
        if (result.status_code === 34) return callback(new NotFoundError('resource not found'))

        let season = []

        season.air_date = result.air_date
        season.overview = result.overview
        season.imageUrl = `https://image.tmdb.org/t/p/original${result.poster_path}`

        callback(undefined, season)
    })
}