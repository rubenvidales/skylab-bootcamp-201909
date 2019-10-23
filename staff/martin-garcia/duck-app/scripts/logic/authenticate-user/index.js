function logIn(mail, password, callback) {
    if (typeof mail !== 'string') throw new TypeError(mail + ' is not a string')
    if (!mail.trim().length) throw new ContentError('e-mail is empty or blank')
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (!password.trim().length) throw new ContentError('password is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')


    call('POST', 'https://skylabcoders.herokuapp.com/api/auth', undefined, { 'username': mail, 'password': password }, (result) => {

        if (result.error) {
            callback(new Error(result.error));
        } else {
            const { data: { id, token } } = result;
            callback(undefined, { id, token });
        }
    });

}