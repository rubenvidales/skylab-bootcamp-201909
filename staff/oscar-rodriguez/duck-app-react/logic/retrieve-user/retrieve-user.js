function retrieveUser(id, token, callback) {  

    if (typeof id !== 'string') throw new TypeError(id +  ' is not a string');
    if (typeof id !== 'string') throw new TypeError(id +  ' is not a string');

    call('GET', 'https://skylabcoders.herokuapp.com/api/user/' + id, undefined, token, result => {
        result.error ? callback(new Error(result.error)) : callback(undefined, result);
    });

}