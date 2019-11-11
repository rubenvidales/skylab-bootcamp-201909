describe('Hooray.prototype.some', function(){
    it('should succes on finding an element in hooray evaluated by an expression', function(){
        var numbers = new Hooray(1, 2, 3);

        expect(numbers).toBeInstanceOf(Hooray);

        var isTwo = function (x) { return x === 2; };
        var result = numbers.some(isTwo);
        

        expect(result).toBe(true);
        expect(numbers).toEqual(new Hooray(1, 2, 3));
    });

    it('should succeed on no-finding an element in hooray evaluated by an expression', function () {
        var numbers = new Hooray(1, 2, 3);

        expect(numbers).toBeInstanceOf(Hooray);

        var isFour = function (x) { return x === 4; };
        var result = numbers.some(isFour);
        

        expect(result).toBe(false);
        expect(numbers).toEqual(new Hooray(1, 2, 3));
    });


    it('should fail on non-function expression', function () {
        var hooray = new Hooray(1, 2, 3);

        expect(function () { hooray.forEach(undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function() { hooray.forEach(true); }).toThrowError(TypeError, 'true is not a function');
        expect(function() { hooray.forEach(1); }).toThrowError(TypeError, '1 is not a function');
    });
});

