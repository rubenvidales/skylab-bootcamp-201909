function searchDucks(query, callback) {
    if (typeof query !== 'string') throw new TypeError(query +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');
    query ? query : query = ""
    url = 'https://duckling-api.herokuapp.com/api/search?q=' + query
    call('GET',url, '', function(result) {
        result.error? callback(new Error(result.error)) : callback(undefined, result)
    });
}