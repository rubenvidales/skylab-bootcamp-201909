function authenticateUser(email, password, callback) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('POST', 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, undefined, result => {
        if (result.error)
            callback(new Error(result.error))
        else {
            const { data: { id, token } } = result

            callback(undefined, { id, token })
        }
    })
}