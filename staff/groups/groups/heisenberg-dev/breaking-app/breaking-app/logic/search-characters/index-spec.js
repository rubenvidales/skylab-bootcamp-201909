describe('logic - search-characters', () => {
       
   it('should show searched item', done => {  
       let query="Saul Goodman"    
      searchCharacters(query,function (error, data) {
          
          
          expect(query).toBeDefined()
          expect(error).toBeUndefined()
            expect(data).toBeDefined()

            data.forEach(character => {
          
               
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
     
               
              
            });
           done()
        })
    })
   
})