describe('Hooray.prototype.pop', function () {
    it('should return the last item of a hooray', function () {
        var hooray = new Hooray(1, 2, 3, 4, 5);

        expect(hooray.pop()).toBe(5);

    })

    it('should return undefined on empty hooray', function () {
        var hooray = new Hooray;

        expect(hooray.pop()).toBe(undefined);

    })


})