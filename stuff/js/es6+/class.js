// DEMO

class A { constructor(value) { this.value = value } print() { console.log('A', this.value) } }

const a = new A('hola')

a.print()

class B extends A { constructor(value) { super(value) } print() { console.log('B', this.value) } }

const b = new B('mundo')

b.print()
// A hola
// B mundo

// DEMO static methods (factories)

class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
}

class Rectangle extends Shape {
    constructor (id, x, y, width, height) {
        super(id, x, y)
        this.width  = width
        this.height = height
    }
    static defaultRectangle () {
        return new Rectangle("default", 0, 0, 100, 100)
    }
}

class Circle extends Shape {
    constructor (id, x, y, radius) {
        super(id, x, y)
        this.radius = radius
    }
    static defaultCircle () {
        return new Circle("default", 0, 0, 100)
    }
}

var rect = Rectangle.defaultRectangle()
var circ = Circle.defaultCircle()