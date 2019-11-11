function retrieveUser(id,token, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    // if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', 'https://skylabcoders.herokuapp.com/api/user/'+id,{"token":token}, result =>{
        result.error ? callback(new Error(result.error), email) : callback();

    })

}