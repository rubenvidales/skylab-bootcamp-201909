describe('logic - character-list', () => {
    let name, surname, email, password, id, token, charId = '1'

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

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favChars: [charId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed', done => {
    
            listCharacters(id, token, (error, data) =>{
                expect(error).toBeUndefined()
                expect(data).toBeDefined()
            })
        })
    })
       
/*    it('should type element is correct', done => {  
           
    listCharacters(id, token, function (error, data) {
            
            expect(error).toBeUndefined()
            expect(data).toBeDefined()

            data.forEach(character => {
              
                expect(typeof character.char_id).toBe('number')

                expect(character.name).toBeDefined()
                expect(typeof character.name).toBe('string')
               
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
     
                expect(character.category).toBeDefined() 
            });
           done()
        })
    })
    */
})