fdescribe('logic - season retrieve', function () {
    it('should retrieve the information of a season', function (done) {
        let season = '1'

        seasonRetrieve(season, (undefined,result) => {
            expect(result).toBeDefined()

            expect(result.air_date).toBeDefined()
            expect(typeof result.air_date).toBe('string')
            expect(result.air_date.length).toBeGreaterThan(0)

            expect(result.overview).toBeDefined()
            expect(typeof result.overview).toBe('string')
            expect(result.overview.length).toBeGreaterThan(0)

            expect(result.imageUrl).toBeDefined()
            expect(typeof result.imageUrl).toBe('string')
            expect(result.imageUrl.length).toBeGreaterThan(0)

            done()
        })
    })

/*     it('should retrieve error if the season does not exists', () => {
        let season = '21'
        expect(() => seasonRetrieve(season, ()=>{} )).toThrowError(NotFoundError, 'resource not found')
    }) */

    it('should retrieve error if the season parameter is not valid', () => {
        let season = ''
        expect(() => seasonRetrieve(season)).toThrowError(ContentError, 'season is empty or blank')
    })
})