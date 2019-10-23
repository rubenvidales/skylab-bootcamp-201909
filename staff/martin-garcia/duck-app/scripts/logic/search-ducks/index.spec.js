describe('logic - search ducks', function() {
    it('should succeed on correct criteria (query)', function(done) {
        var query = 'blue';

        searchDucks(query, function(error, ducks) {
            expect(error).toBeUndefined();

            expect(ducks).toBeDefined();
            expect(ducks.length).toBeGreaterThan(0);

            ducks.forEach(function(duck) {
                expect(duck).toBeDefined();
                expect(typeof duck.id).toBe('string');
                expect(duck.id.length).toBeGreaterThan(0);

                expect(duck.title).toBeDefined();
                expect(typeof duck.title).toBe('string');
                expect(duck.title.length).toBeGreaterThan(0);

                expect(duck.imageUrl).toBeDefined();
                expect(typeof duck.imageUrl).toBe('string');
                expect(duck.imageUrl.length).toBeGreaterThan(0);

                expect(duck.price).toBeDefined();
                expect(typeof duck.price).toBe('string');
                expect(duck.price.length).toBeGreaterThan(0);
            });

            done();
        });
    });

    it('should fail on incorrect criteria', function(done) {
        var query = 'asdfljasdf';

        searchDucks(query, function(error, ducks) {
            expect(ducks).toBeUndefined();

            expect(error).toBeDefined();

            expect(error.message).toBeDefined();
            expect(typeof error.message).toBe('string');
            expect(error.message.length).toBeGreaterThan(0);

            done();
        });
    });

    it('should fail on incorrect query or expression types', function() {
        expect(function() { searchDucks(1); }).toThrowError(TypeError, '1 is not a string');
        expect(function() { searchDucks(true); }).toThrowError(TypeError, 'true is not a string');
        expect(function() { searchDucks([]); }).toThrowError(TypeError, ' is not a string');
        expect(function() { searchDucks({}); }).toThrowError(TypeError, '[object Object] is not a string');
        expect(function() { searchDucks(undefined); }).toThrowError(TypeError, 'undefined is not a string');
        expect(function() { searchDucks(null); }).toThrowError(TypeError, 'null is not a string');

        expect(function() { searchDucks('red', 1); }).toThrowError(TypeError, '1 is not a function');
        expect(function() { searchDucks('red', true); }).toThrowError(TypeError, 'true is not a function');
        expect(function() { searchDucks('red', []); }).toThrowError(TypeError, ' is not a function');
        expect(function() { searchDucks('red', {}); }).toThrowError(TypeError, '[object Object] is not a function');
        expect(function() { searchDucks('red', undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function() { searchDucks('red', null); }).toThrowError(TypeError, 'null is not a function');
    });
});