function call(method, url, token, body, callback) {
    let headers = {};
    if (body) headers['Content-Type'] = 'application/json;charset=UTF-8';
    if (token) headers['Authorization'] = 'Bearer ' + token;
    fetch(method, url, headers, body, response => {
        if (response.readyState == 4) {
            const result = JSON.parse(response.responseText);
            callback(result);
        }
    })
}