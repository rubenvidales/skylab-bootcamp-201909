/**
 * 
 * @param {string} id the id of your user
 * @param {string} token the token of your session
 * @param {function} callback retrieve the favourite character you select
 */

 function retrieveFavCharacters(id, token, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (!id.trim().length) throw new ContentError(id+' is empty or blank')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!token.trim().length) throw new ContentError(token+' is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
        if (result.error) return callback(new Error(result.error))

        const { data: { favChars = [] } } = result

        callback(undefined, favChars)
    })
}