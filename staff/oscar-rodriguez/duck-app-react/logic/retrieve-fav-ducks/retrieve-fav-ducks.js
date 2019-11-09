function retrieveFavDucks(id, token, callback) {
    if (typeof id !== 'string') throw new TypeError(id +  ' is not a string');
    if (typeof token !== 'string') throw new TypeError(token +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');

    call('GET', 'https://skylabcoders.herokuapp.com/api/user/' + id, undefined, token, user => {
                if (user.error ) callback(new Error(user.error))
                else {
                    const {favs} = user.data
                    const favDucksResult = []
                    favs.forEach (duck => {
                        call('GET',`https://duckling-api.herokuapp.com/api/ducks/${duck}`, undefined, undefined, result => {
                            if (result.error) callback(error = new Error(result.error))
                            else {
                                result.fav = true
                                favDucksResult.push(result)
                                callback(undefined,favDucksResult)

                            }
                        })
                    })
                    callback(undefined, favDucksResult)
                }
    })          
}
