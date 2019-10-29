describe('', () => {
       
   it('should type lement is correct', done => {
        
            characters(()=> {
                call('GET', undefined, 'https://www.breakingbadapi.com/api/characters', undefined, result => {
            if (result.error) done(new Error(result.error))
            else {
                const { data } = result
            
            }
        
            expect(error).toBeUndefined()

           expect(data).toBeDefined()
           expect(typeof data.id).toBe('number')

           expect(data.name).toBeDefined()
           expect(typeof data.name).toBe('string')
          

           expect(data.birthday).toBeDefined()
           expect(typeof data.birthaday).toBe('string')
           expect(data.birthaday.length).toBeGreaterThan(0)

           expect(data.ocupation).toBeDefined()
           expect(typeof data.ocupation).toBe('string')
           expect(data.ocupation.length).toBeGreaterThan(0)

           expect(data.img).toBeDefined()
           expect(typeof data.img).toBe('string')
           expect(data.img.length).toBeGreaterThan(0)

           expect(data.status).toBeDefined()
           expect(typeof data.status).toBe('string')
           expect(data.status.length).toBeGreaterThan(0)

           expect(data.nickname).toBeDefined()
           //expect(typeof data.nickname).toBe('')
           expect(data.nickname.length).toBeGreaterThan(0)

           expect(data.apearence).toBeDefined()
           //expect(typeof data.apearence).toBe('')
           expect(data.apearence.length).toBeGreaterThan(0)

           expect(data.portrayed).toBeDefined()
           expect(typeof data.portrayed).toBe('string')
           expect(data.portrayed.length).toBeGreaterThan(0)

           expect(data.category).toBeDefined()
           expect(typeof data.category).toBe('string')
           expect(data.category.length).toBeGreaterThan(0)

           done()
       })
   })

   
   })

})