describe('logic - retrieve duck', () => {
    let name, surname, email, password, id, token, duckId = '5c3853aebd1bde8520e66e11'

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

    it('should succeed on correct duck id', done => {
        retrieveDuck(id, token, duckId, (error, duck) => {
            expect(error).toBeUndefined()

            expect(duck).toBeDefined()
            expect(duck.id).toBe(duckId)

            expect(duck.title).toBeDefined()
            expect(typeof duck.title).toBe('string')
            expect(duck.title.length).toBeGreaterThan(0)

            expect(duck.image).toBeDefined()
            expect(typeof duck.image).toBe('string')
            expect(duck.image.length).toBeGreaterThan(0)

            expect(duck.description).toBeDefined()
            expect(typeof duck.description).toBe('string')
            expect(duck.description.length).toBeGreaterThan(0)

            expect(duck.link).toBeDefined()
            expect(typeof duck.link).toBe('string')
            expect(duck.link.length).toBeGreaterThan(0)

            expect(duck.price).toBeDefined()
            expect(typeof duck.price).toBe('string')
            expect(duck.price.length).toBeGreaterThan(0)

            expect(duck.isFav).toBeFalsy()

            done()
        })
    })

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: [duckId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct duck id', done => {
            retrieveDuck(id, token, duckId, (error, duck) => {
                expect(error).toBeUndefined()
    
                expect(duck).toBeDefined()
                expect(duck.id).toBe(duckId)
    
                expect(duck.title).toBeDefined()
                expect(typeof duck.title).toBe('string')
                expect(duck.title.length).toBeGreaterThan(0)
    
                expect(duck.image).toBeDefined()
                expect(typeof duck.image).toBe('string')
                expect(duck.image.length).toBeGreaterThan(0)
    
                expect(duck.description).toBeDefined()
                expect(typeof duck.description).toBe('string')
                expect(duck.description.length).toBeGreaterThan(0)
    
                expect(duck.link).toBeDefined()
                expect(typeof duck.link).toBe('string')
                expect(duck.link.length).toBeGreaterThan(0)
    
                expect(duck.price).toBeDefined()
                expect(typeof duck.price).toBe('string')
                expect(duck.price.length).toBeGreaterThan(0)
    
                expect(duck.isFav).toBeTruthy()
    
                done()
            })
        })
    })

    it('should fail on incorrect duck id', done => {
        const wrongDuckId = '5c3853ABCd1bde8520e66e1b'

        retrieveDuck(id, token, wrongDuckId, (error, duck) => {
            expect(duck).toBeUndefined()

            expect(error).toBeDefined()

            expect(error.message).toBeDefined()
            expect(typeof error.message).toBe('string')
            expect(error.message.length).toBeGreaterThan(0)

            done()
        })
    })

    it('should fail on incorrect id or expression types', () => {
        // TODO cases when id and token have values diff from non-empty string

        expect(() => { retrieveDuck(id, token, 1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { retrieveDuck(id, token, true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { retrieveDuck(id, token, []) }).toThrowError(TypeError, ' is not a string')
        expect(() => { retrieveDuck(id, token, {}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { retrieveDuck(id, token, undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { retrieveDuck(id, token, null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { retrieveDuck(id, token, 'red', 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { retrieveDuck(id, token, 'red', true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { retrieveDuck(id, token, 'red', []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { retrieveDuck(id, token, 'red', {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { retrieveDuck(id, token, 'red', undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { retrieveDuck(id, token, 'red', null) }).toThrowError(TypeError, 'null is not a function')
    })
})