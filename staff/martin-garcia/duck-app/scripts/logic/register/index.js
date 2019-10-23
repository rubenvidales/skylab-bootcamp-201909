function registUser(name, lastName, mail, password, age, callback) {
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (!name.trim().length) throw new ContentError('name is empty or blank')
    if (typeof lastName !== 'string') throw new TypeError(lastName + ' is not a string')
    if (!lastName.trim().length) throw new ContentError('lastName is empty or blank')
    if (typeof mail !== 'string') throw new TypeError(mail + ' is not a string')
    if (!mail.trim().length) throw new ContentError('e-mail is empty or blank')
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (!password.trim().length) throw new ContentError('password is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('POST', 'https://skylabcoders.herokuapp.com/api/user', undefined, { 'username': mail, 'password': password, 'name': name, 'lastName': lastName, 'age': age.toString() }, result => {
        if (result.error) {
            callback(new Error(result.error), undefined);
        } else {
            callback(undefined, result);
        }
    });

}
/* 
}call('POST', 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, result => {
    result.error ? callback(new Error(result.error)) : callback();
}) */