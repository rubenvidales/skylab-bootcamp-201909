describe('logic - season retrieve', function () {
    it('should retrieve the information of a season', function (done) {

        seasonRetrieve((error, result) => {
            expect(result).toBeDefined()

            expect(error).toBeUndefined()

            result.forEach(result => {

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
    })

    describe('should fail on incorrect expression types', function () {
        it('should throw an error message if the callback is not a function', function () {
            expect(function () { seasonRetrieve(1) }).toThrowError(TypeError, '1 is not a function')
            expect(function () { seasonRetrieve(true) }).toThrowError(TypeError, 'true is not a function')
            expect(function () { seasonRetrieve([]) }).toThrowError(TypeError, ' is not a function')
            expect(function () { seasonRetrieve({}) }).toThrowError(TypeError, '[object Object] is not a function')
            expect(function () { seasonRetrieve(undefined) }).toThrowError(TypeError, 'undefined is not a function')
        })
    })
})