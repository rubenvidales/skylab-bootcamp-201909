describe('logic - retrieve duck', function() {
    it('should succeed on correct duck id', function(done) {
        var id = '5c3853aebd1bde8520e66e1b';

        retrieveDuck(id, function(error, duck) {
            expect(error).toBeUndefined();

            expect(duck).toBeDefined();
            expect(duck.id).toBe(id);

            expect(duck.title).toBeDefined();
            expect(typeof duck.title).toBe('string');
            expect(duck.title.length).toBeGreaterThan(0);

            expect(duck.imageUrl).toBeDefined();
            expect(typeof duck.imageUrl).toBe('string');
            expect(duck.imageUrl.length).toBeGreaterThan(0);

            expect(duck.description).toBeDefined();
            expect(typeof duck.description).toBe('string');
            expect(duck.description.length).toBeGreaterThan(0);

            expect(duck.link).toBeDefined();
            expect(typeof duck.link).toBe('string');
            expect(duck.link.length).toBeGreaterThan(0);

            expect(duck.price).toBeDefined();
            expect(typeof duck.price).toBe('string');
            expect(duck.price.length).toBeGreaterThan(0);

            done();
        });
    });

    it('should fail on incorrect duck id', function(done) {
        var id = '5c3853ABCd1bde8520e66e1b';

        retrieveDuck(id, function(error, duck) {
            expect(duck).toBeUndefined();

            expect(error).toBeDefined();

            expect(error.message).toBeDefined();
            expect(typeof error.message).toBe('string');
            expect(error.message.length).toBeGreaterThan(0);

            done();
        });
    });

    it('should fail on incorrect id or expression types', function() {
        expect(function() { retrieveDuck(1); }).toThrowError(TypeError, '1 is not a string');
        expect(function() { retrieveDuck(true); }).toThrowError(TypeError, 'true is not a string');
        expect(function() { retrieveDuck([]); }).toThrowError(TypeError, ' is not a string');
        expect(function() { retrieveDuck({}); }).toThrowError(TypeError, '[object Object] is not a string');
        expect(function() { retrieveDuck(undefined); }).toThrowError(TypeError, 'undefined is not a string');
        expect(function() { retrieveDuck(null); }).toThrowError(TypeError, 'null is not a string');

        expect(function() { retrieveDuck('red', 1); }).toThrowError(TypeError, '1 is not a function');
        expect(function() { retrieveDuck('red', true); }).toThrowError(TypeError, 'true is not a function');
        expect(function() { retrieveDuck('red', []); }).toThrowError(TypeError, ' is not a function');
        expect(function() { retrieveDuck('red', {}); }).toThrowError(TypeError, '[object Object] is not a function');
        expect(function() { retrieveDuck('red', undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function() { retrieveDuck('red', null); }).toThrowError(TypeError, 'null is not a function');
    });
});