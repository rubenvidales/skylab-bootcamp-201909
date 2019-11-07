const https = require('https')

module.exports = function (method, _url, headers, body, callback) {
    // var xhr = new XMLHttpRequest;

    // xhr.open(method, url);

    // xhr.onreadystatechange = function () {
    //     callback(this);
    // };

    // if (headers) 
    //     for (let key in headers)
    //         xhr.setRequestHeader(key, headers[key])

    // body? xhr.send(JSON.stringify(body)) : xhr.send();

    // if (headers) 
    //     for (let key in headers)
    //         xhr.setRequestHeader(key, headers[key])

    const { hostname, pathname, search } = new URL(_url)

    const path = `${pathname}${search}`

    const request = https.request({ method, hostname, headers, path }, callback)

    body && request.write(JSON.stringify(body))

    request.end()
}