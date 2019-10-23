describe('logic - authenticate user', () => {
    let name, surname, email, password

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        call('POST', 'https://skylabcoders.herokuapp.com/api/user', undefined, { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else done()
        });
    })

    it('should succeed on correct credentials', done => {
        logIn(email, password, (error, response) => {
            expect(error).toBeUndefined()

            expect(response).toBeDefined()

            const { id, token } = response

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')
            expect(id.length).toBeGreaterThan(0)

            expect(token).toBeDefined()
            expect(typeof token).toBe('string')
            expect(token.length).toBeGreaterThan(0)

            done()
        })
    })

    it('should fail on incorrect email, password, or expression type and content', () => {
        expect(() => logIn(1)).toThrowError(TypeError, '1 is not a string')
        expect(() => logIn(true)).toThrowError(TypeError, 'true is not a string')
        expect(() => logIn([])).toThrowError(TypeError, ' is not a string')
        expect(() => logIn({})).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => logIn(undefined)).toThrowError(TypeError, 'undefined is not a string')
        expect(() => logIn(null)).toThrowError(TypeError, 'null is not a string')

        expect(() => logIn(email, 1)).toThrowError(TypeError, '1 is not a string')
        expect(() => logIn(email, true)).toThrowError(TypeError, 'true is not a string')
        expect(() => logIn(email, [])).toThrowError(TypeError, ' is not a string')
        expect(() => logIn(email, {})).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => logIn(email, undefined)).toThrowError(TypeError, 'undefined is not a string')
        expect(() => logIn(email, null)).toThrowError(TypeError, 'null is not a string')

        expect(() => logIn(email, password, 1)).toThrowError(TypeError, '1 is not a function')
        expect(() => logIn(email, password, true)).toThrowError(TypeError, 'true is not a function')
        expect(() => logIn(email, password, [])).toThrowError(TypeError, ' is not a function')
        expect(() => logIn(email, password, {})).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => logIn(email, password, undefined)).toThrowError(TypeError, 'undefined is not a function')
        expect(() => logIn(email, password, null)).toThrowError(TypeError, 'null is not a function')
    })

})