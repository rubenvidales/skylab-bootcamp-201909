describe('logic - search ducks', () => {
    let name, surname, email, password, id, token, duckId = '5c3853aebd1bde8520e66e1b'

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        call('POST', 'https://skylabcoders.herokuapp.com/api/user', undefined, { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else {
                call('POST', 'https://skylabcoders.herokuapp.com/api/auth', undefined, { username: email, password }, result => {
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

    it('should succeed on correct criteria (query)', done => {
        const query = 'blue'

        searchDucks(id, token, query, (error, ducks) => {
            expect(error).toBeUndefined()

            expect(ducks).toBeDefined()
            expect(ducks.length).toBeGreaterThan(0)

            ducks.forEach(function (duck) {
                expect(duck).toBeDefined()
                expect(typeof duck.id).toBe('string')
                expect(duck.id.length).toBeGreaterThan(0)

                expect(duck.title).toBeDefined()
                expect(typeof duck.title).toBe('string')
                expect(duck.title.length).toBeGreaterThan(0)

                expect(duck.imageUrl).toBeDefined()
                expect(typeof duck.imageUrl).toBe('string')
                expect(duck.imageUrl.length).toBeGreaterThan(0)

                expect(duck.price).toBeDefined()
                expect(typeof duck.price).toBe('string')
                expect(duck.price.length).toBeGreaterThan(0)

                expect(duck.isFav).toBeFalsy()
            })

            done()
        })
    })

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT',`https://skylabcoders.herokuapp.com/api/user/${id}`, { "Content-Type": "application/json", 'Authorization': 'Bearer ' + token }, { favs: [duckId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct criteria (query)', done => {
            const query = 'blue'

            searchDucks(id, token, query, (error, ducks) => {
                expect(error).toBeUndefined()

                expect(ducks).toBeDefined()
                expect(ducks.length).toBeGreaterThan(0)

                const hasFav = ducks.some(duck => duck.isFav)

                expect(hasFav).toBeTruthy()

                ducks.forEach(function (duck) {
                    expect(duck).toBeDefined()
                    expect(typeof duck.id).toBe('string')
                    expect(duck.id.length).toBeGreaterThan(0)

                    expect(duck.title).toBeDefined()
                    expect(typeof duck.title).toBe('string')
                    expect(duck.title.length).toBeGreaterThan(0)

                    expect(duck.imageUrl).toBeDefined()
                    expect(typeof duck.imageUrl).toBe('string')
                    expect(duck.imageUrl.length).toBeGreaterThan(0)

                    expect(duck.price).toBeDefined()
                    expect(typeof duck.price).toBe('string')
                    expect(duck.price.length).toBeGreaterThan(0)

                    duck.id === duckId ? expect(duck.isFav).toBeTruthy() : expect(duck.isFav).toBeFalsy()
                })

                done()
            })
        })
    })

    it('should fail on incorrect criteria', done => {
        const query = 'asdfljasdf'

        searchDucks(id, token, query, (error, ducks) => {
            expect(ducks).toBeUndefined()

            expect(error).toBeDefined()

            expect(error.message).toBeDefined()
            expect(typeof error.message).toBe('string')
            expect(error.message.length).toBeGreaterThan(0)

            done()
        })
    })

    it('should fail on incorrect query or expression types', () => {
        // TODO cases when id and token have values diff from non-empty string

        expect(() => { searchDucks(id, token, 1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { searchDucks(id, token, true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { searchDucks(id, token, []) }).toThrowError(TypeError, ' is not a string')
        expect(() => { searchDucks(id, token, {}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { searchDucks(id, token, undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { searchDucks(id, token, null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { searchDucks(id, token, 'red', 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { searchDucks(id, token, 'red', true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { searchDucks(id, token, 'red', []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { searchDucks(id, token, 'red', {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { searchDucks(id, token, 'red', undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { searchDucks(id, token, 'red', null) }).toThrowError(TypeError, 'null is not a function')
    })
})