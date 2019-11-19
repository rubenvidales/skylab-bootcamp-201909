const { MongoClient, ObjectId } = require('mongodb')

let client

function database(url) {
    return client ?
        client
        :
        (() => {
            let connection

            client = new MongoClient(url, { useUnifiedTopology: true })

            const connect = client.connect.bind(client)

            client.connect = function () {
                return connection ?
                    connection
                    :
                    connection = connect().then(connection => connection.db())
            }

            const close = client.close.bind(client) // 0
            // const close = client.close // 1

            client.close = function() {
                close() // 0
                // close.call(client) // 1
                // close.call(this) // 1

                client = undefined
            } 

            return client
        })()
}

database.ObjectId = ObjectId

module.exports = database