describe('Hooray.prototype.fill', function () {
    it('should return hooray filled with number 3', function () {
        var hooray = new Hooray(1, 2, 3, 4);
        var item = 3
        var result = new Hooray(3, 3, 3, 3)

        expect(hooray.fill(item)).toEqual(result);

    })
    it('should return hooray filled with number 6, starting on position 2', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var item = 6;
        var start = 2;
        var result = new Hooray(1, 2, 6, 6, 6, 6, 6, 6, 6)
        expect(hooray.fill(item, start)).toEqual(result);

    })
    it('should return hooray filled with number 4, starting on position 3 and ending on position 6', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var item = 4;
        var start = 3;
        var end = 6;
        var result = new Hooray(1, 2, 3, 4, 4, 4, 7, 8, 9)

        expect(hooray.fill(item, start, end)).toEqual(result);
    })

    it('should should return hooray filled with undefined on non-item', function () {
        var hooray = new Hooray(1, 2, 3);
        var item
        var result = new Hooray(undefined, undefined, undefined)

        expect(hooray.fill(item)).toEqual(result);

    })

    it('should return hooray filled with number 2, start counting index at the end of hooray.length', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6);
        var item = 2;
        var start = -2;
        var result = new Hooray(1, 2, 3, 4, 2, 2)

        expect(hooray.fill(item,start)).toEqual(result);

    })

    it('should fail on undefined item', function () {
        var hooray = new Hooray(1, 2, 3);


        expect(function () { hooray.fill(s); }).toThrowError(ReferenceError, 's is not defined');
        expect(function () { hooray.fill(one); }).toThrowError(ReferenceError, 'one is not defined');
        expect(function () { hooray.fill(g); }).toThrowError(ReferenceError, 'g is not defined');
    });

});