/*function searchDucks(query, callback) {
  if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
  if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)



  call('GET', query ? 'https://duckling-api.herokuapp.com/api/search?q=' + query : 'https://duckling-api.herokuapp.com/api/search', undefined, undefined, result => {
    result.error ? callback(new Error(result.error)) : callback(undefined, result)
  })
}

*/

function searchDucks(id, token, query, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (!id.trim().length) throw new ContentError('id is empty or blank')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!token.trim().length) throw new ContentError('token is empty or blank')
    if (typeof query !== 'string') throw new TypeError(query + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', query ? 'https://duckling-api.herokuapp.com/api/search?q=' + query : 'https://duckling-api.herokuapp.com/api/search', undefined, undefined, result => {
        if (result.error) return callback(new Error(result.error))

        call('GET', `https://skylabcoders.herokuapp.com/api/user/${id}`, { "Content-Type": "application/json", 'Authorization': 'Bearer ' + token }, undefined, result2 => {
            if (result2.error) return callback(new Error(result2.error))

            const { data: { favs = [] } } = result2

            result.map(duck => {
                duck.isFav = favs.includes(duck.id)
            })

            callback(undefined, result)
        })
    })
}