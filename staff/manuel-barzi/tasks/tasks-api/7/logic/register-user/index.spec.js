require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const registerUser = require('.')
const { ContentError } = require('../../utils/errors')
const { random } = Math
const { database, models: { User } } = require('../../data')

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, username, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        return User.deleteMany()
    })

    it('should succeed on correct credentials', async () => {
        const response = await registerUser(name, surname, email, username, password)

        expect(response).to.be.undefined

        const user = await User.findOne({ username })

        expect(user).to.exist

        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.username).to.equal(username)
        expect(user.password).to.equal(password)
    })

    describe('when user already exists', () => {
        beforeEach(() => User.create({ name, surname, email, username, password }))

        it('should fail on already existing user', async () => {
            try {
                await registerUser(name, surname, email, username, password)

                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error.message).to.exist
                expect(typeof error.message).to.equal('string')
                expect(error.message.length).to.be.greaterThan(0)
                expect(error.message).to.equal(`user with username ${username} already exists`)
            }
        })
    })

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
        expect(() => registerUser(1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser([])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser('')).to.throw(ContentError, 'name is empty or blank')
        expect(() => registerUser(' \t\r')).to.throw(ContentError, 'name is empty or blank')

        expect(() => registerUser(name, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(name, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(name, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(name, '')).to.throw(ContentError, 'surname is empty or blank')
        expect(() => registerUser(name, ' \t\r')).to.throw(ContentError, 'surname is empty or blank')

        expect(() => registerUser(name, surname, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(name, surname, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(name, surname, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(name, surname, '')).to.throw(ContentError, 'e-mail is empty or blank')
        expect(() => registerUser(name, surname, ' \t\r')).to.throw(ContentError, 'e-mail is empty or blank')

        expect(() => registerUser(name, surname, email, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, email, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, email, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(name, surname, email, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(name, surname, email, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, email, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(name, surname, email, '')).to.throw(ContentError, 'username is empty or blank')
        expect(() => registerUser(name, surname, email, ' \t\r')).to.throw(ContentError, 'username is empty or blank')

        expect(() => registerUser(name, surname, email, username, '')).to.throw(ContentError, 'password is empty or blank')
        expect(() => registerUser(name, surname, email, username, ' \t\r')).to.throw(ContentError, 'password is empty or blank')
    })

    // TODO other cases

    after(() => User.deleteMany().then(database.disconnect))
})