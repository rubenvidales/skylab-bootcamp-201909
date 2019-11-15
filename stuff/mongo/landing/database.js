const { MongoClient } = require('mongodb')

let client

module.exports = function (url) {
    return client ?
        client
        :
        (() => {
            let connection
            
            client = new MongoClient(url)

            const connect = client.connect.bind(client)

            client.connect = function () {
                return connection ?
                    Promise.resolve(connection)
                    :
                    connect().then(_connection => connection = _connection)
            }

            return client
        })()
}