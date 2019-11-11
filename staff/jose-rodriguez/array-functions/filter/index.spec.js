describe('filter', function () {
    it('should succed returning a new array with the match array and expression', function () {
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var expression = function (x) { if (x % 2 == 0) return true };
        var result = filter(array, expression);
        expect(result).toEqual([2, 4, 6, 8]);
    })



    it('should fail on no array', function () {
        var array;
        var item = 3;

        expect(function () { filter(array, item); }).toThrowError('undefined is not an array');
    })

    it('should fail on non-expression', function () {
        var array = [1,2,3];

    
        expect(function () { filter(array, 'g'); }).toThrowError('g is not a function');
        expect(function () { filter(array, false); }).toThrowError('false is not a function');
        expect(function () { filter(array, undefined); }).toThrowError('undefined is not a function');

    })

})