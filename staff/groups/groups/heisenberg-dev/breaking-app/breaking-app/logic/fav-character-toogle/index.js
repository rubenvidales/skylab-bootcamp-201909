function favCharacterToogle(id, token, favCharId, callback){
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (!id.trim().length) throw new ContentError('id is empty or blank')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!token.trim().length) throw new ContentError('token is empty or blank')
    if (typeof favCharId !== 'string') throw new TypeError(favCharId + ' is not a string')
    if (!favCharId.trim().length) throw new ContentError('duck id is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
        if (result.error) return callback(new Error(result.error))

        const { data: { favChars = [] } } = result
        const index = favChars.findIndex(fav => fav === favCharId)

        index > -1 ? favChars.splice(index, 1) : favChars.push(favCharId)

        call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favChars }, result => {
            result.error ? callback(new Error(result.error)) : callback()
        })
    })
}