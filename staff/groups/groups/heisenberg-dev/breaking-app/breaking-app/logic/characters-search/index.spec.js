describe('logic - search-characters', () => {
    let name, surname, email, password, id, token, charId = '8'

    beforeEach(done => {
        name = `ba-name-${Math.random()}`
        surname = `ba-surname-${Math.random()}`
        email = `ba-email-${Math.random()}@mail.com`
        password = `ba-password-${Math.random()}`

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

    describe('should show searched character', () => {

        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favChars: [charId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('after add the character in user favs', done => {

            let query = "Saul Goodman"
            searchCharacters(id, token, query, function (error, character) {

                expect(error).toBeUndefined()
                expect(character).toBeDefined()

                expect(character.birthday).toBeDefined()
                expect(typeof character.birthday).toBe('string')
                expect(character.birthday.length).toBeGreaterThan(0)

                expect(character.occupation).toBeDefined()

                expect(character.img).toBeDefined()
                expect(typeof character.img).toBe('string')
                expect(character.img.length).toBeGreaterThan(0)

                expect(character.status).toBeDefined()
                expect(typeof character.status).toBe('string')
                expect(character.status.length).toBeGreaterThan(0)
                expect(character.nickname).toBeDefined()
                expect(typeof character.nickname).toBe('string')

                expect(character.appearance).toBeDefined()

                expect(character.portrayed).toBeDefined()
                expect(typeof character.portrayed).toBe('string')
                expect(character.portrayed.length).toBeGreaterThan(0)

                expect(typeof character.isFav).toBe('boolean')
                expect(typeof character.isFav).toBeTruthy()

                done()
            })
        })
    })

})