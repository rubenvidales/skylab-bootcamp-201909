function retrieveDuck(id, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call('GET', undefined, 'https://duckling-api.herokuapp.com/api/ducks/' + id, undefined, function (result) {
        if (result.error)
            callback(new Error(result.error))
        else {
            result.image = result.imageUrl

            delete result.imageUrl

            callback(undefined, result)
        }
    });
}