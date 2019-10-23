describe('logic - register user', () => {
    let name, surname, email, password, age

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        age = `${Math.random()}`

    })

    it('should succeed on correct credentials', done => {
        registUser(name, surname, email, password, age, (error, response) => {
            expect(error).toBeUndefined()
            expect(response).toBeDefined()

            done()
        })


    })

    describe('when user already exists', () => {
        beforeEach(done => {
            registUser(name, surname, email, password, age, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBeDefined()
                debugger
                done()
            })

        })

        it('should fail on already existing user', done => {
            registUser(name, surname, email, password, age, (error, response) => {
                expect(response).toBeUndefined()
                expect(error).toBeDefined()
                debugger
                expect(error.message).toBeDefined()
                expect(typeof error.message).toBe('string')
                expect(error.message.length).toBeGreaterThan(0)

                done()
            })

        })
    })

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
        const uno = 1;
        expect(() => registUser(uno)).toThrowError(TypeError, '1 is not a string')
        expect(() => registUser(true)).toThrowError(TypeError, 'true is not a string')
        expect(() => registUser([])).toThrowError(TypeError, ' is not a string')
        expect(() => registUser({})).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => registUser(undefined)).toThrowError(TypeError, 'undefined is not a string')
        expect(() => registUser(null)).toThrowError(TypeError, 'null is not a string')


        expect(() => registUser(name, uno)).toThrowError(TypeError, '1 is not a string')
        expect(() => registUser(name, true)).toThrowError(TypeError, 'true is not a string')
        expect(() => registUser(name, [])).toThrowError(TypeError, ' is not a string')
        expect(() => registUser(name, {})).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => registUser(name, undefined)).toThrowError(TypeError, 'undefined is not a string')
        expect(() => registUser(name, null)).toThrowError(TypeError, 'null is not a string')

        expect(() => registUser(name, surname, uno)).toThrowError(TypeError, '1 is not a string')
        expect(() => registUser(name, surname, true)).toThrowError(TypeError, 'true is not a string')
        expect(() => registUser(name, surname, [])).toThrowError(TypeError, ' is not a string')
        expect(() => registUser(name, surname, {})).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => registUser(name, surname, undefined)).toThrowError(TypeError, 'undefined is not a string')
        expect(() => registUser(name, surname, null)).toThrowError(TypeError, 'null is not a string')


        expect(() => registUser(name, surname, email, uno)).toThrowError(TypeError, '1 is not a string')
        expect(() => registUser(name, surname, email, true)).toThrowError(TypeError, 'true is not a string')
        expect(() => registUser(name, surname, email, [])).toThrowError(TypeError, ' is not a string')
        expect(() => registUser(name, surname, email, {})).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => registUser(name, surname, email, undefined)).toThrowError(TypeError, 'undefined is not a string')
        expect(() => registUser(name, surname, email, null)).toThrowError(TypeError, 'null is not a string')
    })
})