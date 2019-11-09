function retrieveDuck(id, token, duckId, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (!id.trim().length) throw new ContentError('id is empty or blank')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!token.trim().length) throw new ContentError('token is empty or blank')
    if (typeof duckId !== 'string') throw new TypeError(duckId + ' is not a string')
    if (!duckId.trim().length) throw new ContentError('duck id is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', undefined, `https://duckling-api.herokuapp.com/api/ducks/${duckId}`, undefined, result => {
        if (result.error) return callback(new Error(result.error))

        call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result2 => {
            if (result2.error) return callback(new Error(result2.error))

            const { data: { favs = [] } } = result2

            result.image = result.imageUrl

            delete result.imageUrl

            result.isFav = favs.includes(result.id)

            callback(undefined, result)
        })
    })
}