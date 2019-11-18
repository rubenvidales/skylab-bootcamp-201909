require('dotenv').config()
const { env: { DB_URL_TEST }} = process
const { expect } = require('chai')
const { random } = Math
const database = require('../../utils/database')
const retrieveUser = require('.')
const { NotFoundError } = require('../../utils/errors')

describe('logic - retrieve user', () => {
    let client, users

    before(() => {
        client = database(DB_URL_TEST)

        return client.connect()
            .then(connection => users = connection.db().collection('users'))
    })

    let id, name, surname, email, username, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        return users.insertOne({ name, surname, email, username, password })
            .then(({ insertedId }) => id = insertedId.toString())
    })

    it('should succeed on correct user id', () =>
        retrieveUser(id)
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.equal(id)
                expect(user._id).to.not.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.username).to.equal(username)
                expect(user.password).to.be.undefined
            })
    )

    it('should fail on wrong user id', () => {
        const id = '012345678901234567890123'

        return retrieveUser(id)
            .then(() => {
                throw Error('should not reach this point')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${id} not found`)
            })
    })

    // TODO other cases

    after(() => client.close())
})