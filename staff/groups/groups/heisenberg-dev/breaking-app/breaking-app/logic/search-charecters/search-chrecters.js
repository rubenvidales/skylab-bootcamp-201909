function searchCharecters(query, callback) {
    
   if (typeof query !== 'string') throw new TypeError(query + ' is not a string')
   if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

   call('GET', undefined, query ? 'https://www.breakingbadapi.com/api/characters' + query : 'https://duckling-api.herokuapp.com/api/search', undefined, result => {
       if (result.error) return callback(new Error(result.error))
           callback(undefined, result)
   })
}