const { expect } = require('chai')
const call = require('../../helpers/call')
const retrieveFavDucks = require('.')

describe('logic - retrieve fav ducks', () => {
    let name, surname, email, password, id, token, duckIds = ['5c3853aebd1bde8520e66e1b', '5c3853aebd1bde8520e66e5f', '5c3853aebd1bde8520e66eaa']

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

    it('should succeed on correct user data and return not ducks on no favs', () => {
        return retrieveFavDucks(id, token)
            .then((ducks) => {
                expect(ducks).not.to.be.undefined
                expect(ducks.length).to.equal(0)
            })
    })

    describe('when favs already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: duckIds }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct user data', () => {
            retrieveFavDucks(id, token)
                .then((ducks) => {


                    expect(ducks).not.to.be.undefined
                    expect(ducks.length).to.equal(duckIds.length)

                    ducks.forEach(duck => {
                        expect(duck).not.to.be.undefined
                        expect(typeof duck.id).to.equal('string')
                        expect(duck.id.length).to.be.gt(0)

                        expect(duck.title).not.to.be.undefined
                        expect(typeof duck.title).to.equal('string')
                        expect(duck.title.length).to.be.gt(0)

                        expect(duck.image).not.to.be.undefined
                        expect(typeof duck.image).to.equal('string')
                        expect(duck.image.length).to.be.gt(0)

                        expect(duck.price).not.to.be.undefined
                        expect(typeof duck.price).to.equal('string')
                        expect(duck.price.length).to.be.gt(0)

                        const isFav = duckIds.includes(duck.id)
                        expect(isFav).to.be.true
                    })
                })
        })
    })

        it('should fail on incorrect user data or expression types', () => {    
            expect(() => { retrieveFavDucks(1) }).to.throw(TypeError, '1 is not a string')
            expect(() => { retrieveFavDucks(true) }).to.throw(TypeError, 'true is not a string')
            expect(() => { retrieveFavDucks([]) }).to.throw(TypeError, ' is not a string')
            expect(() => { retrieveFavDucks({}) }).to.throw(TypeError, '[object Object] is not a string')
            expect(() => { retrieveFavDucks(undefined) }).to.throw(TypeError, 'undefined is not a string')
            expect(() => { retrieveFavDucks(null) }).to.throw(TypeError, 'null is not a string')
    
            expect(() => { retrieveFavDucks(id, 1) }).to.throw(TypeError, '1 is not a string')
            expect(() => { retrieveFavDucks(id, true) }).to.throw(TypeError, 'true is not a string')
            expect(() => { retrieveFavDucks(id, []) }).to.throw(TypeError, ' is not a string')
            expect(() => { retrieveFavDucks(id, {}) }).to.throw(TypeError, '[object Object] is not a string')
            expect(() => { retrieveFavDucks(id, undefined) }).to.throw(TypeError, 'undefined is not a string')
            expect(() => { retrieveFavDucks(id, null) }).to.throw(TypeError, 'null is not a string')
        })
})