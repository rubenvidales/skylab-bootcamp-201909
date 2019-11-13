const { ContentError } = require('./errors')

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validate = {
    typeOf(type, target) {
        if (typeof target !== type) throw new TypeError(`${target} is not a ${type}`)
    },

    string(target) {
        this.typeOf('string', target)
    },

    function(target) {
        this.typeOf('function', target)
    },

    number(target) {
        this.typeOf('number', target)
    },

    boolean(target) {
        this.typeOf('boolean', target)
    },

    instanceOf(type, target) {
        if (!(target instanceof type)) throw TypeError(`${target} is not a ${type.name}`)
    },

    array(target) {
        this.instanceOf(Array, target)
    },

    email(target) {
        if (!EMAIL_REGEX.test(String(target).toLowerCase())) throw ContentError(`${target} is not an e-mail`)
    }
}

validate.string.notVoid = function (name, target) {
    if (!target.trim().length) throw new ContentError(`${name} is empty or blank`)
}

module.exports = validate
