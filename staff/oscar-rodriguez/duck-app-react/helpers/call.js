function call(method, url, body, token, callback) {
    let headers = {}

    if (body) headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (token) headers['Authorization'] = 'Bearer '+token

    fetch(method, url, headers, body, function (response) {
        if (response.readyState == 4) {
            var result = JSON.parse(response.responseText);

            callback(result);
        }
    });
}