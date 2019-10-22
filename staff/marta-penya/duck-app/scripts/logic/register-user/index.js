function registerUser(name, surname, email, password, callback) {
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('POST', 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, undefined, result => {
        result.error ? callback(new Error(result.error)) : callback();
    })
}