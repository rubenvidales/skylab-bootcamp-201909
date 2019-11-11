describe('Hooray.prototye.findIndex', function () {
    it('should return the index of the element finded in the hooray by an expression.', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var findThree = function (x) { return x === 3 };

        expect(hooray.findIndex(findThree)).toBe(2)
    })

    it('should return -1 if the element is nout found.', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var findAbc = function (x) { return x === 'abc' };

        expect(hooray.findIndex(findAbc)).toBe(-1);
    })

    it('should fail on non-function',function(){

        var hooray = new Hooray (1,2,3);

        expect(function(){hooray.find('f')}).toThrowError(TypeError, 'f is not a function');
        expect(function(){hooray.find(undefined)}).toThrowError(TypeError, 'undefined is not a function');
        expect(function(){hooray.find(false)}).toThrowError(TypeError, 'false is not a function');
        
    })
})