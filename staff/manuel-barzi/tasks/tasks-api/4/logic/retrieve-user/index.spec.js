const { expect } = require('chai')
const { random } = Math
const users = require('../../data/users')('test')
const retrieveUser = require('.')
const uuid = require('uuid/v4')
const { NotFoundError } = require('../../utils/errors')

describe('logic - retrieve user', () => {
    before(() => users.load())

    let id, name, surname, email, username, password

    beforeEach(() => {
        id = uuid()
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        users.data.push({ id, name, surname, email, username, password })
    })

    it('should succeed on correct user id', () =>
        retrieveUser(id)
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.equal(id)
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.username).to.equal(username)
                expect(user.password).to.be.undefined
            })
    )

    it('should fail on wrong user id', () => {
        const id = 'wrong'

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
})