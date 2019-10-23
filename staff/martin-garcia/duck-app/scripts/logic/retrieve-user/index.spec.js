describe('logic - retrieve user', () => {
    let name, surname, email, password, id, token, username

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`

        password = `password-${Math.random()}`
        age = `age-${Math.random()}`

        call('POST', 'https://skylabcoders.herokuapp.com/api/user', undefined, { name, surname, username: email, age, password }, result => {
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
    it('should succeed on correct user data', done => {
        retrieveUser(id, token, (data, error) => {
            expect(error).toBeUndefined()
            expect(data).toBeDefined()
            expect(data.data.name).toBe(name)
            expect(data.data.surname).toBe(surname)
            expect(data.data.username).toBe(email)
            expect(data.data.age).toBe(age)
            expect(data.data.password).toBeUndefined()

            done()
        })
    })

    //
})