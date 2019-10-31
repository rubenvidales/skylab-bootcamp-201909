fdescribe('logic - Retrieve character details', () => {

    let name, surname, email, password, id, token, charId = '4'

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

    fdescribe('Check if the character is favourite for this user', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favChars: [charId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        fit('success if is favourite', done => {
            retrieveCharDetails(id, token, charId, (error, result) =>{
                expect(error).toBeUndefined()
                expect(result).toBeDefined()
                expect(result.name.length).toBeGreaterThan(0)
                done()
            })
        })
    })
})
