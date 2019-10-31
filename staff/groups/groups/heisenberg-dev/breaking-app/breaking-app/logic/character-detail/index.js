/**
 * This funtion return detail of one character
 * @param {string} id Unique Id per character
 * @param {function name(params) {
     
 }} callback  to return call
 */
function retrieveCharDetails(id, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (!id.trim().length) throw new ContentError(id + ' is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', undefined, 'https://www.breakingbadapi.com/api/characters/' + id, undefined, (result) => {
        if (result.name == 'error') return callback(new Error('Incorrect query'))
        if (result.length === 0) return callback(new Error('No result for this query'))

        callback(undefined, result[0])
    })
}