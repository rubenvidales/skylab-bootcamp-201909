function retrieveDuck(id, callback) {
    if (typeof id !== 'string') throw new TypeError(id +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');

    call('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id, undefined, undefined, function (result) {
        result.error ? callback(new Error(result.error)) : callback(undefined, result);
    });
}
