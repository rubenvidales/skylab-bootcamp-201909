function listCharacters(id, token, callback) {
      if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

      call('GET', undefined, 'https://www.breakingbadapi.com/api/characters', undefined, result => {
            if (result.name == 'error') return callback(new Error('Incorrect query'))
            if (result.length === 0) return callback(new Error('No result for this query'))

            call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result2 => {
            if (result2.error) return callback(new Error(result2.error))

            const { data: { favChars = [] } } = result2

            result.map(character => { // normalize image url to image
                  character.isFav = favChars.includes(character.char_id.toString())
            })
            callback(undefined, result)
        })
      })
}
