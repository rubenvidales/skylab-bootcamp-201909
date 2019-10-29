describe('logic - retrieve episode', function () {

    it('should retrieve information if the episode has an correct id', function (done) {
        let id = '1'

        retrieveEpisodes(id, function (error, episode) {

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')
            expect(id.length).toBeGreaterThan(0)

            expect(error).toBeUndefined()

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

            done()

        })
    })

    it('should not retrieve information if the episode has an incorrect id', function (done) {
        let id = 'a'

        retrieveEpisodes(id, function (error, episode) {

            expect(episode).toBeUndefined();

            expect(error).toBeDefined();

            expect(error.name).toBeDefined();
            expect(typeof error.name).toBe('string');
            expect(error.name.length).toBeGreaterThan(0);

            done()

        })
    })

    it('should fail on incorrect id or expression types', function() {
        expect(function() { retrieveEpisodes(1); }).toThrowError(TypeError, '1 is not a string');
        expect(function() { retrieveEpisodes(true); }).toThrowError(TypeError, 'true is not a string');
        expect(function() { retrieveEpisodes([]); }).toThrowError(TypeError, ' is not a string');
        expect(function() { retrieveEpisodes({}); }).toThrowError(TypeError, '[object Object] is not a string');
        expect(function() { retrieveEpisodes(undefined); }).toThrowError(TypeError, 'undefined is not a string');
        
        expect(function() { retrieveEpisodes('red', 1); }).toThrowError(TypeError, '1 is not a function');
        expect(function() { retrieveEpisodes('red', true); }).toThrowError(TypeError, 'true is not a function');
        expect(function() { retrieveEpisodes('red', []); }).toThrowError(TypeError, ' is not a function');
        expect(function() { retrieveEpisodes('red', {}); }).toThrowError(TypeError, '[object Object] is not a function');
        expect(function() { retrieveEpisodes('red', undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function() { retrieveEpisodes('red', null); }).toThrowError(TypeError, 'null is not a function');
    });

})