function retrieveDuck(id, token, duckId, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string');
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string');
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call('GET', token, 'https://skylabcoders.herokuapp.com/api/user/' + id, undefined, function (result) {
        const { data: { favs } } = result

        call('GET', undefined, 'https://duckling-api.herokuapp.com/api/ducks/' + duckId, undefined, function (result) {
            if (result.error)
                callback(new Error(result.error))
            else {
                result.image = result.imageUrl

                delete result.imageUrl

                result.fav = favs.includes(result.id)

                callback(undefined, result)
            }
        })

    })
}