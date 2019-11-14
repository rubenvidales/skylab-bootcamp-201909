describe('logic - toggle fav duck', () => {
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

    it('should succeed on correct user and duck data', done => {
        toggleFavDuck(id, token, duckId, (error, response) => {
            expect(error).toBeUndefined()
            expect(response).toBeUndefined()

            call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
                if (result.error) return done(new Error(result.error))

                const { data: { favs } } = result

                expect(favs).toBeDefined()
                expect(favs.length).toBe(1)
                expect(favs[0]).toBe(duckId)

                done()
            })
        })
    })

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: [duckId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct user and duck data', done => {
            toggleFavDuck(id, token, duckId, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBeUndefined()

                call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
                    if (result.error) return done(new Error(result.error))

                    const { data: { favs } } = result

                    expect(favs).toBeDefined()
                    expect(favs.length).toBe(0)

                    done()
                })
            })
        })
    })


})