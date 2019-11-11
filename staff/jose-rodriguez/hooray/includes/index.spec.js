describe('Hooray.prototype.includes', function () {
    it('should evaluates a hooray with a expression', function () {
        var hooray = new Hooray(1, 2, 'c');
        var expectedNumber = 2;
     
        expect(hooray.includes(expectedNumber)).toBe(true);
        expect(hooray.length).toBe(3);
    });

    it('should return false on no arguments', function () {
        var hooray = new Hooray(1,2,3);
    
        expect(hooray.includes()).toBe(false);
    });

    it('should return elem starting from index 2 of hooray', function () {
        var hooray = new Hooray(1,2,3,4,5,6);
        expectedNumber = 5;
        start = 2;

        expect(hooray.includes(expectedNumber,start)).toBe(true);
    });

});