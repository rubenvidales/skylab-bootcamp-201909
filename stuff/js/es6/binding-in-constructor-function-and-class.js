// DEMO referencing prototype method (context points to window)

function Person(name) { this.name = name }

Person.prototype.hello = function() { 
    console.log(`${this.name}: Hello!`) 
}

const hello = new Person('Pepi').hello
hello()
// : Hello!

// DEMO referencing class method (context points to undefined)

class Person {
	constructor(name) {
		this.name = name
    }

	hello() { 
		console.log(`${this.name}: Hello!`) 
	}
}

const hello = new Person('Pepi').hello
hello()
// Uncaught TypeError: Cannot read property 'name' of undefined
//    at hello (<anonymous>:8:23)
//    at <anonymous>:22:1

// DEMO referencing class method (with context binded to class instance)

class Person {
	constructor(name) {
		this.name = name

		this.hello = this.hello.bind(this)
    }

	hello() { 
		console.log(`${this.name}: Hello!`) 
	}
}

const hello = new Person('Pepi').hello
hello()
// Pepi: Hello!

// DEMO declaring class method as arrow function with ES.next (context auto-binded binded to class instance)

class Person {
	constructor(name) {
		this.name = name    
	}

	hello = () => { 
		console.log(`${this.name}: Hello!`) 
	}
}

const hello = new Person('Pepi').hello
hello()
// Pepi: Hello!