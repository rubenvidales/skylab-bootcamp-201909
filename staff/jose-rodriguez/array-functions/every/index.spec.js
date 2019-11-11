describe('every', function () {
    it('should succed on evaluating an array by an expression returning true or false', function () {
        var array = [1, 2, 3, 4];
        function belowTen(num) { return num < 10 };
        var result = every(array, belowTen);
        expect(result).toBe(true)
        expect(array).toEqual([1, 2, 3, 4])
        expect(array.length).toBe(4)

    })

    it('should fain on non-array', function () {
        var array
        var expression = function belowTen(num) { return num < 10 }

        expect(function(){every(array,expression)}).toThrowError('undefined is not an array');
    

    })

    it('should fail on non-expression', function(){

        var array = [1,2,3];
        

        expect(function(){every(array,'f')}).toThrowError('f is not a function');
        expect(function(){every(array,true)}).toThrowError('true is not a function');
        expect(function(){every(array,undefined)}).toThrowError('undefined is not a function');
    
    })



});
