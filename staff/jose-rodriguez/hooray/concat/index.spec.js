describe('Hooray.prototype.concat', function () {
    it('should succeed on correct hooray, concatenating all elements', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6);
        var result = hooray.concat(7,8,9);
        var hoorayTest = new Hooray(1,2,3,4,5,6,7,8,9);

        expect(result).toEqual(hoorayTest);
    });

    it('should succeed on correct hooray, concatenating all elements, passing an object as a parameter', function () {

        var hooray = new Hooray(1,2,3);
        var result = hooray.concat({0:4,1:5,2:6},7,8,9);
        var hoorayTest = new Hooray(1,2,3,{0:4,1:5,2:6},7,8,9);

        expect(result).toEqual(hoorayTest);
    });

    it('should succeed concatenating two hoorays', function () {

        var hooray1 = new Hooray(1,2,3);
        var hooray2 = new Hooray(4,5,6);
        var result = hooray1.concat(hooray2);
        

        expect(hooray1.concat(hooray2)).toEqual(result);
    });

    // it('should fail on undefined expression', function () {
    //     var hooray = new Hooray(1, 2, 3);
    //     var expression; // = console.log;

    //     expect(function () { hooray.forEach(expression); }).toThrow(TypeError, 'undefined is not a function');
    // });

    // it('should fail on non-function expression', function () {
    //     var hooray = new Hooray(1, 2, 3);

    //     expect(function () { hooray.forEach(undefined); }).toThrow(TypeError, 'undefined is not a function');
    //     expect(function () { hooray.forEach(true); }).toThrow(TypeError, 'true is not a function');
    //     expect(function () { hooray.forEach(1); }).toThrow(TypeError, '1 is not a function');
    // });
});
