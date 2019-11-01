describe('logic - episode list', function () {

    it('should retrieve the list of the Breaking Bad episodes of one season', function (done) {
        let season = '1'

        listEpisodes(season, function (error, episodes) {

            expect(season).toBeDefined()
            expect(typeof season).toBe('string')
            expect(season.length).toBeGreaterThan(0)

            expect(error).toBeUndefined()

            expect(episodes).toBeDefined()
            expect(typeof episodes).toBe('object')
            expect(episodes.length).toBeGreaterThan(0)

            episodes.forEach(function (episode) {

                expect(episode).toBeDefined()
                expect(typeof episode).toBe('object')

                expect(episode.episode_id).toBeDefined()
                expect(typeof episode.episode_id).toBe('number')

                expect(episode.title).toBeDefined()
                expect(typeof episode.title).toBe('string')
                expect(episode.title.length).toBeGreaterThan(0)

                expect(episode.season).toBeDefined()
                expect(typeof episode.season).toBe('string')
                expect(episode.season.length).toBeGreaterThan(0)

                expect(episode.air_date).toBeDefined()
                expect(typeof episode.air_date).toBe('string')
                expect(episode.air_date.length).toBeGreaterThan(0)

                expect(episode.characters).toBeDefined()
                expect(typeof episode.characters).toBe('object')
                expect(episode.characters.length).toBeGreaterThan(0)

                expect(episode.episode).toBeDefined()
                expect(typeof episode.episode).toBe('string')
                expect(episode.episode.length).toBeGreaterThan(0)

                expect(episode.series).toBeDefined()
                expect(typeof episode.series).toBe('string')
                expect(episode.series.length).toBeGreaterThan(0)

            })

            done()

        })
    })

    it('should retrieve an empty array if the number of season don\'t belong to a Breaking Bad season', function (done) {
        let season = '6'

        listEpisodes(season, function (error, episodes) {

            expect(season).toBeDefined()
            expect(typeof season).toBe('string')
            expect(season.length).toBeGreaterThan(0)

            expect(episodes).toBeDefined()
            expect(episodes.length).toEqual(0)

            expect(typeof episodes).toBe('object')

            done()

        })
    })

    it('should retrieve an empty array if the season string is not a number', function (done) {
        let season = 'a'

        listEpisodes(season, function (error, episodes) {

            expect(season).toBeDefined()
            expect(typeof season).toBe('string')
            expect(season.length).toBeGreaterThan(0)

            expect(episodes).toBeDefined()
            expect(episodes.length).toEqual(0)

            expect(typeof episodes).toBe('object')

            done()

        })
    })

    it('should retrieve an empty array if the season string is empty', function (done) {
        let season = ''

        listEpisodes(season, function (error, episodes) {

            expect(season).toBeDefined()
            expect(typeof season).toBe('string')
            expect(season.length).toEqual(0)

            expect(episodes).toBeDefined()
            expect(episodes.length).toEqual(0)

            expect(typeof episodes).toBe('object')

            done()

        })
    })

    describe('should fail on incorrect season or expression types', function () {
        it('should throw an error message if the season is not a string', function () {
            expect(function () { listEpisodes(1) }).toThrowError(TypeError, '1 is not a string')
            expect(function () { listEpisodes(true) }).toThrowError(TypeError, 'true is not a string')
            expect(function () { listEpisodes([]) }).toThrowError(TypeError, ' is not a string')
            expect(function () { listEpisodes({}) }).toThrowError(TypeError, '[object Object] is not a string')
            expect(function () { listEpisodes(undefined) }).toThrowError(TypeError, 'undefined is not a string')
        })
        it('should throw an error message if the callback is not a function', function () {
            expect(function () { listEpisodes('1', 1) }).toThrowError(TypeError, '1 is not a function')
            expect(function () { listEpisodes('1', true) }).toThrowError(TypeError, 'true is not a function')
            expect(function () { listEpisodes('1', []) }).toThrowError(TypeError, ' is not a function')
            expect(function () { listEpisodes('1', {}) }).toThrowError(TypeError, '[object Object] is not a function')
            expect(function () { listEpisodes('1', undefined) }).toThrowError(TypeError, 'undefined is not a function')
            expect(function () { listEpisodes('1', null) }).toThrowError(TypeError, 'null is not a function')
        })
    })
})