function retrieveUser(id, token, callback) {
    if (typeof id !== 'string') throw new TypeError(id +  ' is not a string');
    if (typeof token !== 'string') throw new TypeError(token +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');
    const url = 'https://skylabcoders.herokuapp.com/api/user/' + id
    const body = {'token' : token}
    call('GET', url, body, function (result) {
        result.error ? callback(new Error(result.error)) : callback(result);
    });
}