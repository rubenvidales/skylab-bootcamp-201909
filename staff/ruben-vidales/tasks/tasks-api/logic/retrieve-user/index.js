const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    const client = database()

    return client.connect()
        .then (connection => {
            const users = connection.db().collection('users')

            return users.findOne({ _id: ObjectId(id) })
                .then( user => {
                    if(!user) throw new NotFoundError(`user with id ${id} not found`)
                    
                    return users.updateOne({username: user.username},{$set:{lastAccess: new Date}})
                        .then(result => {
                            if (!result.modifiedCount) throw Error('could not update user')

                            delete user.password
                            return user
                        })                   
                })                
        })
        //Syncronous error if ObjectId can not create the id
        .catch( error => {
            if (error) throw new NotFoundError(`user with id ${id} not found`)
        })
}