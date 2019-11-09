describe('logic - retrieve fav ducks', () => {
    let name, surname, email, password, id, token, duckIds = ['5c3853aebd1bde8520e66e1b', '5c3853aebd1bde8520e66e5f', '5c3853aebd1bde8520e66eaa']

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

    it('should succeed on correct user data and return not ducks on no favs', done => {
        retrieveFavDucks(id, token, (error, ducks) => {
            expect(error).toBeUndefined()

            expect(ducks).toBeDefined()
            expect(ducks.length).toBe(0)

            done()
        })
    })

    describe('when favs already exists', () => {
        beforeEach(done => {
            call('PUT', `https://skylabcoders.herokuapp.com/api/user/${id}`, { "Content-Type": "application/json", 'Authorization': 'Bearer ' + token }, { favs: duckIds }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct user data', done => {
            retrieveFavDucks(id, token, (error, ducks) => {
                expect(error).toBeUndefined()

                expect(ducks).toBeDefined()
                expect(ducks.length).toBe(duckIds.length)

                ducks.forEach(duck => {
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

                    const isFav = duckIds.includes(duck.id)
                    expect(isFav).toBeTruthy()
                })

                done()
            })
        })
    })

    it('should fail on incorrect user data or expression types', () => {
        expect(() => { retrieveFavDucks(1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { retrieveFavDucks(true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { retrieveFavDucks([]) }).toThrowError(TypeError, ' is not a string')
        expect(() => { retrieveFavDucks({}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { retrieveFavDucks(undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { retrieveFavDucks(null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { retrieveFavDucks(id, 1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { retrieveFavDucks(id, true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { retrieveFavDucks(id, []) }).toThrowError(TypeError, ' is not a string')
        expect(() => { retrieveFavDucks(id, {}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { retrieveFavDucks(id, undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { retrieveFavDucks(id, null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { retrieveFavDucks(id, token, 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { retrieveFavDucks(id, token, true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { retrieveFavDucks(id, token, []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { retrieveFavDucks(id, token, {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { retrieveFavDucks(id, token, undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { retrieveFavDucks(id, token, null) }).toThrowError(TypeError, 'null is not a function')
    })
})