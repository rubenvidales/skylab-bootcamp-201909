describe('logic - episode list', function () {
    
    it('should retrieve the array with the list of the Breaking Bad episodes of one season', function (done) {
        let season = '1'

        listEpisodes(season, function(error, episodes){

            expect(season).toBeDefined()
            expect(typeof season).toBe('string')
            expect(season.length).toBeGreaterThan(0)
            
            expect(error).toBeUndefined()

            expect(episodes).toBeDefined()
            expect(episodes.length).toBeGreaterThan(0);

            expect(typeof episodes).toBe('object')

            episodes.forEach(function (episode) {

                expect(episode).toBeDefined()

                expect(typeof episode).toBe('object')

            })

            done()

        })
    })

})