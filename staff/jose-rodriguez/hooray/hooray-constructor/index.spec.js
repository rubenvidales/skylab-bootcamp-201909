describe('Hooray (constructor)', function() {
    it('should build a Hooray with specific length on single numeric argument', function() {
        var hooray = new Hooray(10);

        expect(hooray).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(10);

        var props = Object.getOwnPropertyNames(hooray);
        expect(props.length).toBe(1);
        expect(props).toEqual(['length']);
    });

    it('should build a Hooray with a single value on non-numeric single argument', function() {
        var hooray = new Hooray('a');

        expect(hooray).toBeInstanceOf(Hooray);
        expect(hooray.length).toBe(1);

        var props = Object.getOwnPropertyNames(hooray);
        expect(props.length).toBe(2);
        expect(props).toEqual(['0', 'length']);
    });
});