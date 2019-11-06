const fetch = require('../utils/fetch')

module.exports = function(method, token, url, body, callback) {
    let headers = {}

    if (token) headers['Authorization'] = `Bearer ${token}`
    if (body) headers['Content-Type'] = 'application/json;charset=UTF-8'

    fetch(method, url, headers, body, function (response) {
        // debugger
        // if (response.readyState == 4) {
        //     var result = JSON.parse(response.responseText);

        //     callback(result);
        // }

        let content = ''

        response.on('data', chunk => content += chunk)

        response.on('end', () => callback(JSON.parse(content)))
    })
}