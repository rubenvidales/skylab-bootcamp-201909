const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017')

client.connect(err => {
    if (err) throw err

    const db = client.db('bootcamp-201909')

    const users = db.collection('users')

    users.insertOne({ name: 'Pepito', surname: 'Grillo '})
        .then(() => client.close())
})