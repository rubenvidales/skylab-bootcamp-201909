function searchDucks(query, callback) {
    if (typeof query !== 'string') throw new TypeError(query +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');

    call('GET', undefined, query ? 'https://duckling-api.herokuapp.com/api/search?q=' + query : 'https://duckling-api.herokuapp.com/api/search', undefined, function(result) {
        result.error? callback(new Error(result.error)) : callback(undefined, result);
    });
}