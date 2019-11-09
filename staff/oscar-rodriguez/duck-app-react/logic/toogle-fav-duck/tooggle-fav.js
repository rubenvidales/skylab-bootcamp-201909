function toogleFavDucks(userId, token, duckId, callback) {  

    if (typeof userId !== 'string') throw new TypeError(userId +  ' is not a string');
    if (typeof token !== 'string') throw new TypeError(token +  ' is not a string');
    if (typeof duckId !== 'string') throw new TypeError(duckId +  ' is not a string');

    call('GET', 'https://skylabcoders.herokuapp.com/api/user/' + userId, undefined, token, result => {
        const { favs } = result.data
        if (favs) {
            let index = favs.indexOf(duckId)
            index > 0 ? favs.splice (index, 1) : favs.push(duckId)
        }
        call('PUT', 'https://skylabcoders.herokuapp.com/api/user/' + userId, {'favs': favs}, token, result => {
            result.error ? callback(new Error(result.error)) : callback(undefined, result);
        })
    })
    
    
    
    
    

}