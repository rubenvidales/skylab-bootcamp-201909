describe('Hooray.prototype.slice', function () {
    it('should return a new Hooray with the values in the given limits', function () {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        expect(numbers).toBeInstanceOf(Hooray);

        var result = numbers.slice(3, 7);

        expect(result).not.toBe(numbers);
        expect(result).toBeInstanceOf(Hooray);

        var expected = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(numbers.length).toBe(9);
        expect(numbers).toEqual(expected);

        expected = new Hooray(4, 5, 6, 7);
        expect(result.length).toBe(4);
        expect(result).toEqual(expected);
    });

    it('should return a new Hooray with the values in from the beginning (no ending)', function () {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        expect(numbers).toBeInstanceOf(Hooray);

        var result = numbers.slice(2);

        expect(result).not.toBe(numbers);
        expect(result).toBeInstanceOf(Hooray);

        var expected = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(numbers.length).toBe(9);
        expect(numbers).toEqual(expected);

        expected = new Hooray(3, 4, 5, 6, 7, 8, 9);
        expect(result.length).toBe(7);
        expect(result).toEqual(expected);
    });

    it('should return a new empty Hooray (from an empty Hooray) from a beginning (no ending)', function () {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        expect(numbers).toBeInstanceOf(Hooray);

        var result = numbers.slice(12);

        expect(result).not.toBe(numbers);
        expect(result).toBeInstanceOf(Hooray);

        var expected = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(numbers.length).toBe(9);
        expect(numbers).toEqual(expected);

        expected = new Hooray();
        expect(result.length).toBe(0);
        expect(result).toEqual(expected);
    });

    it('should return a new Hooray with the same values of the original Hooray when no beginning and no ending', function () {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        expect(numbers).toBeInstanceOf(Hooray);

        var result = numbers.slice();

        expect(result).not.toBe(numbers);
        expect(result).toBeInstanceOf(Hooray);

        var expected = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(numbers.length).toBe(9);
        expect(numbers).toEqual(expected);

        expected = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(result.length).toBe(9);
        expect(result).toEqual(expected);
    });

    it('should return a new Hooray with the last values of the original Hooray when beginning is negative and no ending', function () {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        expect(numbers).toBeInstanceOf(Hooray);

        var result = numbers.slice(-4);

        expect(result).not.toBe(numbers);
        expect(result).toBeInstanceOf(Hooray);

        var expected = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(numbers.length).toBe(9);
        expect(numbers).toEqual(expected);

        expected = new Hooray(6, 7, 8, 9);
        expect(result.length).toBe(4);
        expect(result).toEqual(expected);
    });

    it('should return a new Hooray with values of the original Hooray from the beginning and ending, both negatives', function () {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        expect(numbers).toBeInstanceOf(Hooray);

        var result = numbers.slice(-7, -3);

        expect(result).not.toBe(numbers);
        expect(result).toBeInstanceOf(Hooray);

        var expected = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(numbers.length).toBe(9);
        expect(numbers).toEqual(expected);

        expected = new Hooray(3, 4, 5, 6);
        expect(result.length).toBe(4);
        expect(result).toEqual(expected);
    });

    it('should return a new Hooray with no values when the beginning and ending are both negatives and ending < beginning', function () {
        var numbers = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

        expect(numbers).toBeInstanceOf(Hooray);

        var result = numbers.slice(-3, -7);

        expect(result).not.toBe(numbers);
        expect(result).toBeInstanceOf(Hooray);

        var expected = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(numbers.length).toBe(9);
        expect(numbers).toEqual(expected);

        expected = new Hooray();
        expect(result.length).toBe(0);
        expect(result).toEqual(expected);
    });
});