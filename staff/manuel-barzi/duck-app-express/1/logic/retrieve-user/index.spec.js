const { expect } = require('chai')
const call = require('../../helpers/call')
const retrieveUser = require('../retrieve-user')

describe.only('logic - retrieve user', () => {
    let name, surname, email, password, id, token

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else {
                call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, result => {
                    if (result.error) done(new Error(result.error))
                    else {
                        const { data } = result

                        id = data.id
                        token = data.token

                        done()
                    }
                })
            }
        })
    })

    it('should succeed on correct user data', done => {
        retrieveUser(id, token, (error, data) => {
            expect(error).not.to.exist

            expect(data).to.exist
            expect(data.name).to.equal(name)
            expect(data.surname).to.equal(surname)
            expect(data.username).to.equal(email)
            expect(data.password).not.to.exist

            done()
        })
    })

    // TODO other cases
})