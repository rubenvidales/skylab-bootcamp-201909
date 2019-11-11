describe('Hooray.prototype.map', function () {
    it('should return a new Hooray adding 5 to each element in the original hooray', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5);
        var add = function (x) { return x + 5 };
        var hooray2 = hooray.map(add);
        var result = new Hooray(6, 7, 8, 9, 10);

        expect(hooray2).toEqual(result);
    })

    it('should return a new hooray multiplying each elements by 5', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5);
        var add = function (x) { return x * 5 };
        var hooray2 = hooray.map(add);
        var result = new Hooray(5, 10, 15, 20, 25);

        expect(hooray2).toEqual(result);
    })

    it('should fail on non-expression', function () {
        var hooray = new Hooray(1, 2, 3, 4);
        
        expect(function() {hooray.map(true)}).toThrowError(TypeError, 'true is not a function');
        expect(function() {hooray.map('a')}).toThrowError(TypeError, 'a is not a function');
    })
})