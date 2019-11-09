function authenticateUser(email, password, callback) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!email.trim().length) throw new ContentError('e-mail is empty or blank')
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (!password.trim().length) throw new ContentError('password is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, result => {
        result.error ? callback(new Error(result.error)) : callback(undefined, result.data)
    })
}