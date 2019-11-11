describe('Hooray.prototype.join',function(){
    it('should return a string with te values of a hooray', function(){
        var hooray = new Hooray (1,2,3,4);


        expect(hooray.join()).toBe('1,2,3,4');
    })
})