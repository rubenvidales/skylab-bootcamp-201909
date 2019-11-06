const https = require('https')
const url = require('url')

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

    const { hostname, pathname } = new URL(_url)

    // if (headers) 
    //     for (let key in headers)
    //         xhr.setRequestHeader(key, headers[key])

    const request = https.request({ method, hostname, headers, path: pathname }, callback)

    body && request.write(JSON.stringify(body))
    request.end()
}