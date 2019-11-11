describe('Hooray.prototype.every', function () {
    it('should succeed if every hooray element is > 10', function () {
        var hooray = new Hooray(1, 2, 3, 10);
        var majorTen = function (x) { return x > 10 };

        expect(hooray.every(majorTen)).toBe(false);

    })
    it('should succeed if every hooray element is < 10', function () {
        var hooray = new Hooray(1, 2, 3);
        var minorTen = function (x) { return x < 10 };

        expect(hooray.every(minorTen)).toBe(true);

    })
    it('should return true if every hooray element is a number', function () {
        var hooray = new Hooray(1, 2, 3);
        var isNumber = function (x) { if(typeof x === 'number') return true };

        expect(hooray.every(isNumber)).toBe(true);
    })

    it('should return false if there is almost one hooray element that not pass the expression', function () {
        var hooray = new Hooray('john', 'doe', 3);
        var isNumber = function (x) { if(typeof x === 'string') return true };

        expect(hooray.every(isNumber)).toBe(false);

    })

    it('should fail on non-function expression', function () {
        var hooray = new Hooray(1, 2, 3);


        expect(function () { hooray.every(undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function() { hooray.every(true); }).toThrowError(TypeError, 'true is not a function');
        expect(function() { hooray.every(1); }).toThrowError(TypeError, '1 is not a function');
    });

});