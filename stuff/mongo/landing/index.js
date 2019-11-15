// 1

// const { MongoClient, ObjectId } = require('mongodb')
// const client = new MongoClient('mongodb://localhost:27017')

// client.connect(err => {
//     if (err) throw err

//     const db = client.db('bootcamp-201909')

//     const users = db.collection('users')

//     users.insertOne({ name: 'Pepito', surname: 'Grillo'})
//         .then(() => client.close())
// })

// client.connect()
//     .then(() => {
//         const db = client.db('bootcamp-201909')

//         const users = db.collection('users')

//         // users.insertOne({ name: 'Pepito', surname: 'Grillo' })
//         //     .then(() => client.close())

//         //return users.findOne({ _id: ObjectId('5dce90da6996844514f9cc33') })
//         return users.findOne({ surname: 'Grillo 2' })
//     })
//     .then(user => { debugger })
//     .catch(error => { debugger })

// 2

// const client = new MongoClient('mongodb://localhost:27017/bootcamp-201909')
// client.connect()
//     .then(connection => {
//         const db = connection.db()
//         const users = db.collection('users')

//         // users.insertOne({ name: 'Pepito', surname: 'Grillo' })
//         //     .then(() => client.close())

//         //return users.findOne({ _id: ObjectId('5dce90da6996844514f9cc33') })
//         return users.findOne({ surname: 'Grillo 2' })
//     })
//     .then(user => { console.log(user); debugger; client.close() })
//     .catch(error => { debugger })

const database = require('./database')

const client = database('mongodb://localhost:27017/bootcamp-201909')

client.connect()
    .then(connection => {
        const users = connection.db().collection('users')
        return users.insertOne({ name: 'Pepito', surname: 'Grillo 2' })
            .then(result => {
                const { insertedId } = result

                return users.updateOne({ _id: insertedId }, { $set: { lastAccess: new Date } })
            })
    })
    .then(result => {
        debugger

        //return users.findOne({ _id: ObjectId('5dce90da6996844514f9cc33') })
        return users.findOne({ surname: 'Grillo 2' })
            .then(user => { console.log(user); debugger })
            .then(() => {
                return client.connect()
                    .then(connection => {
                        const users = connection.db().collection('users')
                        // users.insertOne({ name: 'Pepito', surname: 'Grillo' })
                        //     .then(() => client.close())

                        //return users.findOne({ _id: ObjectId('5dce90da6996844514f9cc33') })
                        return users.findOne({ surname: 'Grillo 2' })
                            .then(user => { console.log(user); debugger })
                            .catch(error => { debugger })
                    })
            })
            .then(() => {
                const client = database('mongodb://localhost:27017/bootcamp-201909')

                return client.connect()
                    .then(connection => {
                        const users = connection.db().collection('users')
                        // users.insertOne({ name: 'Pepito', surname: 'Grillo' })
                        //     .then(() => client.close())

                        //return users.findOne({ _id: ObjectId('5dce90da6996844514f9cc33') })
                        return users.findOne({ surname: 'Grillo 2' })
                            .then(user => { console.log(user); debugger })
                            .catch(error => { debugger })
                    })
            })
            .then(() => client.close())
            .catch(error => { debugger })
    })