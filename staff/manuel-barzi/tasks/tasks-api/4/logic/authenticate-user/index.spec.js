require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const authenticateUser = require('.')
const { ContentError, CredentialsError } = require('../../utils/errors')
const { random } = Math
const database = require('../../utils/database')

describe.only('logic - authenticate user', () => {
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

    it('should succeed on correct credentials', () =>
        authenticateUser(username, password)
            .then(userId => {
                expect(userId).to.exist
                expect(typeof userId).to.equal('string')
                expect(userId.length).to.be.greaterThan(0)

                expect(userId).to.equal(id)
            })
    )

    describe('when wrong credentials', () => {
        it('should fail on wrong username', () => {
            const username = 'wrong'

            return authenticateUser(username, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(CredentialsError)

                    const { message } = error
                    expect(message).to.equal(`wrong credentials`)
                })
        })

        it('should fail on wrong password', () => {
            const password = 'wrong'

            return authenticateUser(username, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(CredentialsError)

                    const { message } = error
                    expect(message).to.equal(`wrong credentials`)
                })
        })
    })

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
        expect(() => authenticateUser(1)).to.throw(TypeError, '1 is not a string')
        expect(() => authenticateUser(true)).to.throw(TypeError, 'true is not a string')
        expect(() => authenticateUser([])).to.throw(TypeError, ' is not a string')
        expect(() => authenticateUser({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => authenticateUser(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => authenticateUser(null)).to.throw(TypeError, 'null is not a string')

        expect(() => authenticateUser('')).to.throw(ContentError, 'username is empty or blank')
        expect(() => authenticateUser(' \t\r')).to.throw(ContentError, 'username is empty or blank')

        expect(() => authenticateUser(email, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => authenticateUser(email, true)).to.throw(TypeError, 'true is not a string')
        expect(() => authenticateUser(email, [])).to.throw(TypeError, ' is not a string')
        expect(() => authenticateUser(email, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => authenticateUser(email, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => authenticateUser(email, null)).to.throw(TypeError, 'null is not a string')

        expect(() => authenticateUser(email, '')).to.throw(ContentError, 'password is empty or blank')
        expect(() => authenticateUser(email, ' \t\r')).to.throw(ContentError, 'password is empty or blank')
    })

    // TODO other cases

    after(() => client.close())
})