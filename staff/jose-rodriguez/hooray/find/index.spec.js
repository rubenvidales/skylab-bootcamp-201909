describe('Hooray.prototye.find', function () {
    it('should return the element finded in the hooray by an expression.', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var findThree = function (x) { return x === 3 };

        expect(hooray.find(findThree)).toBe(3)
    })

    it('should return undefined if any element matches with the expression.', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var findThree = function (x) { return x === 'abc' };

        expect(hooray.find(findThree)).toBe(undefined)
    })

    it('should fail on non-function',function(){

        var hooray = new Hooray (1,2,3);

        expect(function(){hooray.find('f')}).toThrowError(TypeError, 'f is not a function');
        expect(function(){hooray.find(undefined)}).toThrowError(TypeError, 'undefined is not a function');
        expect(function(){hooray.find(false)}).toThrowError(TypeError, 'false is not a function');
        
    })
})