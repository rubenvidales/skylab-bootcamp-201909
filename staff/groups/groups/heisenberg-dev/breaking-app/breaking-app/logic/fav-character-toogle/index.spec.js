describe('logic - toggle favourite character of an user', () => {

    let name, surname, email, password, id, token, favCharId = '3'

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

    it('should succeed on correct user and chracter data', done => {
        favCharacterToogle(id, token, favCharId, (error, response) => {
            expect(error).toBeUndefined()
            expect(response).toBeUndefined()

            call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {

                if (result.error) return done(new Error(result.error))

                const { data: { favChars } } = result

                expect(favChars).toBeDefined()
                expect(favChars.length).toBe(1)
                expect(favChars[0]).toBe(favCharId)

                done()
            })
        })
    })

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favChars: [favCharId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct user and chracter data', done => {
            favCharacterToogle(id, token, favCharId, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBeUndefined()

                call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {

                    if (result.error) return done(new Error(result.error))

                    const { data: { favChars } } = result

                    expect(favChars).toBeDefined()
                    expect(favChars.length).toBe(0)

                    done()
                })
            })
        })
    })
})