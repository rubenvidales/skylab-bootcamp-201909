function retrieveFavDucks(id, token, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (!id.trim().length) throw new ContentError('id is empty or blank')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!token.trim().length) throw new ContentError('token is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')


    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
        if (result.error) return callback(new Error(result.error))

        const { data: { favs = [] } } = result

        let counter = 0, error

        if (favs.length)
            for (let i = 0; i < favs.length && !error; i++) {
                call('GET', undefined, `https://duckling-api.herokuapp.com/api/ducks/${favs[i]}`, undefined, result2 => {
                    if (result2.error) return callback(error = new Error(result2.error))

                    result2.image = result2.imageUrl

                    delete result2.imageUrl

                    favs[i] = result2

                    ++counter === favs.length && callback(undefined, favs)
                })
            }
        else callback(undefined, favs)
    })
}