if (typeof Function.prototype.extend === 'undefined')
    Function.prototype.extend = function(constructor) {
        this.prototype = Object.create(constructor.prototype);
        this.prototype.constructor = this;
    }