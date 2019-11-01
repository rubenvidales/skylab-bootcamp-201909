/**
 * show of characters attending to query
 * @param {string} id determine a unique user
 * @param {string} token authoritzation
 * @param {string} query element to search
 * @param {function} callback return call
 */

function searchCharacters(id, token, query, callback) {
  if (typeof query !== 'string') throw new TypeError(query + ' is not a string')
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('GET', undefined, `https://www.breakingbadapi.com/api/characters?name=${query}`, undefined, (result) => {
    if (result.name == 'error') return callback(new Error('Incorrect query'))
    if (result.length === 0) return callback(new Error('No result for this query'))

    //callback(undefined, result)
    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result2 => {
      if (result2.error) return callback(new Error(result2.error))

      let character = result[0]

      const { data: { favChars = [] } } = result2

      //ToString because char_id is a number and the favs array are strings
      character.isFav = favChars.includes(character.char_id.toString())

      callback(undefined, character)
    })
  })
}