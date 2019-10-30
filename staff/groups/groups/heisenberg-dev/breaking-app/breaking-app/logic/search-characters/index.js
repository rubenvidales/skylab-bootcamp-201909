function searchCharacters(query, callback) {
    
   if (typeof query !== 'string') throw new TypeError(query + ' is not a string')
   if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

   call('GET', undefined,  `https://www.breakingbadapi.com/api/characters?name=${query}` , undefined, (result) => {
     if (result.error) return callback(new Error(result.error))
        if (result.name == 'error') return callback(new Error('Incorrect query'))

     if (result.length === 0) return callback(new Error('No result for this query'))
       
       callback(undefined, result)
  })
}