function call(method, url, headers, body, callback) {
    
   
    if (!headers) {
        headers = {}
        headers['Content-Type'] = 'application/json;charset=UTF-8'
        
    } 

    // if (body.token) headers['authorization'] = 'bearer '+ body.token;

    fetch(method, url, headers, body, function (response) {
        if (response.readyState == 4) {
            var result = JSON.parse(response.responseText);
            callback(result);
        }
    });
}

