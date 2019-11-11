describe('Hooray.prototype.filter', function () {
    it('should return the elements in hooray that pass the condition in a new Hooray', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8);
        var isPair = function (x) { return x % 2 === 0 }

        var result = hooray.filter(isPair);
        var test = new Hooray(2, 4, 6, 8);
        expect(test).toEqual(result);

    })

    it('should return the elements in hooray that pass the condition in a new Hooray', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var minorFive = function (x) { return x < 5 };
        var result = hooray.filter(minorFive);
        var test = new Hooray(1, 2, 3, 4);

        expect(test).toEqual(result);
    })

    it('should fail on no expression', function () {
        var hooray = new Hooray(1, 2, 3);

        expect(function () { hooray.filter('f'); }).toThrowError(TypeError, 'f is not a function');
        expect(function () { hooray.filter(undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function () { hooray.filter(true); }).toThrowError(TypeError, 'true is not a function');
    });
})