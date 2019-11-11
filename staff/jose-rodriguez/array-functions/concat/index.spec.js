describe('concat', function () {
    it('should succed on concatenating 2 arrays', function () {
        var array1 = [1, 2, 3, 4];
        var array2 = [1, 2, 3, 4];
        var result = [1, 2, 3, 4, 1, 2, 3, 4];

        var newArray = concat(array1, array2);

        expect(newArray.length).toBe(result.length);
        expect(newArray).toEqual(result);

            
        
    }, function(error) {
        expect(error).toBe(undefined);
    })

    it('should succed on concatenating an array with single params', function () {
        var array1 = [1, 2, 3, 4];
        var number = 3;
        var result = [1, 2, 3, 4, 3];

        var newArray = concat(array1, number);

        expect(newArray.length).toBe(result.length);
        expect(newArray).toEqual(result);

    }) 
    
    it('should fail on undefined array', function () {
        var array; //= [1, 2, 3];

        expect(function() { concat(array, 2,3); }).toThrowError('undefined is not an array');
    });
})
