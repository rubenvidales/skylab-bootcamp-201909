const { expect } = require('chai')
const call = require('../../helpers/call')
const authenticateUser = require('../authenticate-user')
const { ContentError } = require('../../utils/errors')

describe.only('logic - authenticate user', () => {
    let name, surname, email, password

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

/*         call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else done()
        }) */
        return new Promise((resolve, reject) => {
            call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, result => {
                result.error ? reject(new Error(result.error)) : resolve()
            })
        })
    })

    it('should succeed on correct credentials', () => {
        debugger
        authenticateUser(email, password)
            .then((response) => {
                debugger
                /*
                expect(error).to.be.undefined

                expect(response).not.to.be.undefined

                const { id, token } = response

                expect(id).to.exist
                expect(typeof id).to.be.a('string')
                expect(id.length).to.be.gt(0)

                expect(token).to.exist
                expect(typeof token).to.be.a('string')
                expect(token.length).to.be.gt(0)
                */
            })
    })

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
        expect(() => authenticateUser(1)).to.throw(TypeError, '1 is not a string')
        expect(() => authenticateUser(true)).to.throw(TypeError, 'true is not a string')
        expect(() => authenticateUser([])).to.throw(TypeError, ' is not a string')
        expect(() => authenticateUser({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => authenticateUser(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => authenticateUser(null)).to.throw(TypeError, 'null is not a string')

        expect(() => authenticateUser('')).to.throw(ContentError, 'e-mail is empty or blank')
        expect(() => authenticateUser(' \t\r')).to.throw(ContentError, 'e-mail is empty or blank')

        expect(() => authenticateUser(email, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => authenticateUser(email, true)).to.throw(TypeError, 'true is not a string')
        expect(() => authenticateUser(email, [])).to.throw(TypeError, ' is not a string')
        expect(() => authenticateUser(email, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => authenticateUser(email, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => authenticateUser(email, null)).to.throw(TypeError, 'null is not a string')

        expect(() => authenticateUser(email, '')).to.throw(ContentError, 'password is empty or blank')
        expect(() => authenticateUser(email, ' \t\r')).to.throw(ContentError, 'password is empty or blank')

        expect(() => authenticateUser(email, password, 1)).to.throw(TypeError, '1 is not a function')
        expect(() => authenticateUser(email, password, true)).to.throw(TypeError, 'true is not a function')
        expect(() => authenticateUser(email, password, [])).to.throw(TypeError, ' is not a function')
        expect(() => authenticateUser(email, password, {})).to.throw(TypeError, '[object Object] is not a function')
        expect(() => authenticateUser(email, password, undefined)).to.throw(TypeError, 'undefined is not a function')
        expect(() => authenticateUser(email, password, null)).to.throw(TypeError, 'null is not a function')
    })
})