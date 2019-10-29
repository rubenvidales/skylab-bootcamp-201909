function retrieveFavCharacters(id, token, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (!id.trim().length) throw new ContentError(id+' is empty or blank')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!token.trim().length) throw new ContentError(token+' is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
        if (result.error) return callback(new Error(result.error))

        const { data: { favChars = [] } } = result

        let counter = 0, error

        if (favChars.length)
            for (let i = 0; i < favChars.length && !error; i++) {
                call('GET', undefined, `https://www.breakingbadapi.com/api/characters/${favChars[i]}`, undefined, result2 => {
                    if (result2.error) return callback(error = new Error(result2.error))

                    result2.image = result2.imageUrl

                    delete result2.imageUrl

                    favChars[i] = result2

                    if (++counter === favChars.length) callback(undefined, favChars)
                })
            }
        else callback(undefined, favChars)
    })
}