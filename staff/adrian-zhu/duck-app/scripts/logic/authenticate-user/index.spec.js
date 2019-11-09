describe('logic - authenticate user', () => {
    let name, surname, email, password

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        call('POST', 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else done()
        })
    })

    it('should succeed on correct credentials', done => {
        authenticateUser(email, password, (error, response) => {
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

    
})