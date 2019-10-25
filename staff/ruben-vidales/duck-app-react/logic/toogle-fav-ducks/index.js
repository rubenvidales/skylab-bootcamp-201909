function toogleFavDucks(userId, token, duckId){
    if (typeof userId !== 'string') throw new TypeError(id + ' is not a string');
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string');
    if (typeof duckId !== 'string') throw new TypeError(query + ' is not a string');
    call('GET',token, 'https://skylabcoders.herokuapp.com/api/user/'+userId, undefined, function(result){
        let {data:{favs}} = result
        
        if (!favs) favs = [] 
        
        const index = favs.indexOf(duckId)

        if (index === -1) favs.push(duckId)
        else favs.splice(index, 1)

        call('PUT', token, 'https://skylabcoders.herokuapp.com/api/user/'+userId, {'favs':favs}, function(result){
            const {error} = result
            if (error) new Error (error); 
        });

        
    });
}