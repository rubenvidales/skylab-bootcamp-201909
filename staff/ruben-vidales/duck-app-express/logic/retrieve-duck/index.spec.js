const { expect } = require('chai')
const call = require('../../helpers/call')
const retrieveDuck = require('.')

describe('logic - retrieve duck', () => {

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

    it('should succeed on correct duck id', () => {
        var duckId = '5c3853aebd1bde8520e66e1b'

        return retrieveDuck(id, token, duckId)
            .then((duck) => {

                expect(duck).to.exist
                expect(duck.id).to.equal(duckId)

                expect(duck.title).to.exist
                expect(typeof duck.title).to.equal('string')
                expect(duck.title.length).to.be.gt(0)

                expect(duck.image).to.exist
                expect(typeof duck.image).to.equal('string')
                expect(duck.image.length).to.be.gt(0)

                expect(duck.description).to.exist
                expect(typeof duck.description).to.equal('string')
                expect(duck.description.length).to.be.gt(0)

                expect(duck.link).to.exist
                expect(typeof duck.link).to.equal('string')
                expect(duck.link.length).to.be.gt(0)

                expect(duck.price).to.exist
                expect(typeof duck.price).to.equal('string')
                expect(duck.price.length).to.be.gt(0)

                expect(duck.isFav).not.to.be.undefined
                expect(typeof duck.isFav).to.equal('boolean')
            })
    })

    it('should fail on incorrect duck id', () => {
        var duckId = '5c3853ABCd1bde8520e66e1b'

        return retrieveDuck(id, token, duckId)
            .then(() => {
                throw Error('should no reach this point')
            })
            .catch((error) => {

                expect(error).to.exist
                expect(error.message).to.exist
                expect(typeof error.message).to.equal('string')
                expect(error.message.length).to.be.gt(0)
            })
    })

    it('should fail on incorrect id or expression types',  () => {
        expect( ()=> { retrieveDuck(id, token, 1) }).to.throw(TypeError, '1 is not a string')
        expect( ()=> { retrieveDuck(id, token, true) }).to.throw(TypeError, 'true is not a string')
        expect( ()=> { retrieveDuck(id, token, []) }).to.throw(TypeError, ' is not a string')
        expect( ()=> { retrieveDuck(id, token, {}) }).to.throw(TypeError, '[object Object] is not a string')
        expect( ()=> { retrieveDuck(id, token, undefined) }).to.throw(TypeError, 'undefined is not a string')
        expect( ()=> { retrieveDuck(id, token, null) }).to.throw(TypeError, 'null is not a string')
    })
})