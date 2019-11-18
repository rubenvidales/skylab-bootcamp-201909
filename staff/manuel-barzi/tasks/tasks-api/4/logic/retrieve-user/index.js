const validate = require('../../utils/validate')
const database = require('../../utils/database')
const { NotFoundError } = require('../../utils/errors')

const { ObjectId } = database

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    const client = database()

    return client.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ _id: ObjectId(id) })
                .then(user => {
                    if (!user) throw new NotFoundError(`user with id ${id} not found`)

                    const lastAccess = new Date

                    return users.updateOne({ _id: ObjectId(id) }, { $set: { lastAccess }})
                        .then(result => {
                            if (!result.modifiedCount) throw Error('failed to update user')

                            user.id = user._id.toString()
                            user.lastAccess = lastAccess

                            delete user._id
                            delete user.password

                            return user
                        })
                })
        })
}