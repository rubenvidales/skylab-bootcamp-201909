function retrieveUser(id, token, callback) {
    if (typeof id !== 'string') throw new TypeError(id +  ' is not a string');
    if (typeof token !== 'string') throw new TypeError(id +  ' is not a string');
    
    call('GET', 'https://skylabcoders.herokuapp.com/api/user/' + id, undefined, token, function (result) {
        result.error ? callback(new Error(result.error)) : callback(undefined, result);
    });
}



//result es lo que guarda el JSON y lo parsea