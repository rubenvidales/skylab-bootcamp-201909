function retrieveUser(id, token, callback) {
    debugger
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string');
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    const url = 'https://skylabcoders.herokuapp.com/api/user/' + id;
    body = undefined;
    call('GET', url, token, body, result => {
        result.error ? callback(new Error(result.error)) : callback(result);
    });
}