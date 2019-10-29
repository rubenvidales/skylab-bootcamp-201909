describe('logic - character-list', () => {
       
   it('should type element is correct', done => {  
           
    listCharacters(function (error, data) {
            
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
   
})