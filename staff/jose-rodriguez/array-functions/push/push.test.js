describe('push', function () {
    it('should push a single item', function () {
        var array = ['a', 'b', 'c'];

        expect(push(array, 'd')).toBe(4);
        expect(array.length).toBe(4);
        expect(array[array.length - 1]).toBe('d');
    });

    it('should push multiple items', function () {
        var array = ['a', 'b', 'c'];

        expect(push(array, 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k')).toBe(11);
        expect(array.length).toBe(11);

        var chars = ['d', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
        for (var i = 3; i < array.length; i++)
            expect(array[i]).toBe(chars[i - 3]);
    });
});