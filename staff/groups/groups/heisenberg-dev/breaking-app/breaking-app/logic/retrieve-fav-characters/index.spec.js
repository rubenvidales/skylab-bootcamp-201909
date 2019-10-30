describe('logic - Retrieve fav characters for a user', () => {

    let name, surname, email, password, id, token, charIds = ['1','3','5']

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

    describe('when favs already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favChars: charIds }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct user data', done => {
            retrieveFavCharacters(id, token, (error, favs) => {
                expect(error).toBeUndefined()

                expect(favs).toBeDefined()
                expect(favs.length).toBe(charIds.length)

                favs.forEach(fav => {
                    expect(fav).toBeDefined()
                    expect(fav).toMatch(/\d+/)
                })

                done()
            })
        })
    })


})
