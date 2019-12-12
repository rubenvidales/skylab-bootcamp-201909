expect.extend({
    toBeOfType(received, argument) {
        return {
            message: () => `expected ${received} to be of type ${argument}`,
            pass: typeof received === argument
        }
    }
})

expect.extend({
    toBeOneOf(received, argument) {
        return {
            message: () => `expected ${received} to be one of ${argument}`,
            pass: argument.includes(received)
        }
    }
})

expect.extend({
    toHaveLengthGreaterThan(received, argument) {
        return {
            message: () => `expected ${received} to have length greater than ${argument}`,
            pass: received.length > argument
        }
    }
})

expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? Array.isArray(received) ? "array" : initialType : initialType;
		return type === argument ? {
			message: () => `expected ${received} to be type ${argument}`,
			pass: true
		} : {
			message: () => `expected ${received} to be type ${argument}`,
			pass: false
		};
	}
});