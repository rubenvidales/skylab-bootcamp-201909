describe('logic - register user', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
    })

    it('should succeed on correct credentials', done => {
        registerUser(name, surname, email, password, (error, response) => {
            expect(error).toBeUndefined()
            expect(response).toBeUndefined()

            done()
        })
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            registerUser(name, surname, email, password, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBeUndefined()

                done()
            })

        })

        it('should fail on already existing user', done => {
            registerUser(name, surname, email, password, (error, response) => {
                expect(response).toBeUndefined()
                expect(error).toBeDefined()

                expect(error.message).toBeDefined()
                expect(typeof error.message).toBe('string')
                expect(error.message.length).toBeGreaterThan(0)

                done()
            })

        })
    })
})