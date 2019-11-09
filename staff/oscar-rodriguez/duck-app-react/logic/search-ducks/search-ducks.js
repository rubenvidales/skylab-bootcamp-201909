function searchDucks(id, token, query, callback) {
    if (typeof query !== 'string') throw new TypeError(query +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');

    call('GET', query ? 'https://duckling-api.herokuapp.com/api/search?q=' + query : 'https://duckling-api.herokuapp.com/api/search', undefined, undefined, function(result) {
        if (result.error ) callback(new Error(result.error))
        else {
            call('GET', 'https://skylabcoders.herokuapp.com/api/user/' + id, undefined, token, user => {
                if (user.error ) callback(new Error(user.error))
                else {
                    const {favs} = user.data
                    callback(undefined, result.map (duck => {
                        favs.includes (duck.id) ? duck.fav = true : duck.fav = false
                        return duck
                    }))
                }  
            })          
        }
    })
}