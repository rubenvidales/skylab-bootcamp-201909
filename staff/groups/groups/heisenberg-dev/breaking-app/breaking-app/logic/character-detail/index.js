/**
 * This funtion return detail of one character
 * @param {string} id Unique Id per character
 * @param {function} callback  to return call
 */
function retrieveCharDetails(id, token, charId, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (!id.trim().length) throw new ContentError(id + ' is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', undefined, 'https://www.breakingbadapi.com/api/characters/' + charId, undefined, (result) => {
        if (result.name == 'error') return callback(new Error('Incorrect query'))
        if (result.length === 0) return callback(new Error('No result for this query'))

        let character = result[0]

        call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result2 => {

            if (result2.error) return callback(new Error(result2.error))

            const { data: { favChars = [] } } = result2

            character.isFav = favChars.includes(character.char_id.toString())

            callback(undefined, character)
        })
    })
}