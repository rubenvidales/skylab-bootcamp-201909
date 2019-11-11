describe('Hooray.prototype.indexOf', function(){
    it('should return the index of an element in a hooray', function (){

        var hooray = new Hooray (1,2,3,4);
        var item = 2;

        expect (hooray.indexOf(item)).toBe(1);
    })

    it('should return -1 when an element is not found in a hooray', function(){

        var hooray = new Hooray (1,2,3,4);
        var item = 5;

        expect (hooray.indexOf(item)).toBe(-1);
    })

    it('should fail on typeof item === undefined', function(){
        var hooray = new Hooray(1,2,3,4);

        expect (function(){hooray.indexOf(a)}).toThrowError(ReferenceError, 'a is not defined');
    })
})