describe('Hooray.prototype.reverse', function () {
    it('should return the array reversed', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5, 6);
        

        expect(hooray).toBeInstanceOf(Hooray);
        hooray.reverse();
        expect(hooray).toEqual(new Hooray(6, 5, 4, 3, 2, 1));
        expect(hooray.length).toBe(6);
    });

})