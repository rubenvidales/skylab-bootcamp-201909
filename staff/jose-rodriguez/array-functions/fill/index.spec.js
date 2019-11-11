describe('fill', function () {
    it('should succed on correct array and item to fill with', function () {
        var array = [1, 2, 3, 4];
        var item = 6;
        fill(array, item);
        expect(array).toEqual([6, 6, 6, 6]);
    })

    it('should succed on correct array, item to fill with and start index', function () {
     var array = [1, 2, 3, 4, 5, 6, 7];
        var item = 9;
        var start = 2
      fill(array, item, start);
        expect(array).toEqual([1, 2, 9, 9, 9, 9, 9]);
    })

    it('should succed on correct array, item to fill with, start index and end index', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];
        var item = 8;
        var start = 1;
        var end = 5;
        fill(array, item, start, end);
        expect(array).toEqual([1, 8, 8, 8, 8, 6, 7]);
    })

    it('should succed with undefined when item is not passed', function () {
        var array = [1, 2, 3];
        fill(array);
        expect(array).toEqual([undefined, undefined, undefined]);
    })

    it('should fail on no array', function(){
        var array;
        var item = 3;

        expect(function() { fill(array,item);}).toThrowError('undefined is not an array');
    })

    it('should fail on array null', function(){
        var array = null;
        var item = 3;

        expect(function() { fill(array,item);}).toThrowError('null is not an array');
    })

})