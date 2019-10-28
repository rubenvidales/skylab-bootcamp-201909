describe('LOGIC - Retrieve character details', () => {
    it('Retrieve the details of a character by id', done =>{
        const id = '1';
        retrieveCharDetails(id, (error, result) =>{
            expect(error).toBeUndefined()
            expect(result).toBeDefined()
            debugger
            expect(result.name.length).toBeGreaterThan(0)
            done()
        })
    })
    it('Retrieve an error if the id is not correct (not a number)', done =>{
        const id = 'a';
        retrieveCharDetails(id, (error, result) =>{
            expect(error).toBeDefined()
            expect(error.message).toBe('Incorrect query')
            expect(result).toBeUndefined()
            done()
        })
    })
    it('Retrieve an error if the id don\'t return a result', done =>{
        const id = '1500';
        retrieveCharDetails(id, (error, result) =>{
            expect(error).toBeDefined()
            expect(error.message).toBe('No result for this query')
            expect(result).toBeUndefined()
            done()
        })
    })
})
