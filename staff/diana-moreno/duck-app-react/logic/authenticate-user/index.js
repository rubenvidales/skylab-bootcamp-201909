function authenticateUser(email, password, callback) {
  if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
  if (!email.trim().length) throw new ContentError('e-mail is empty or blank')
  if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
  if (!password.trim().length) throw new ContentError('password is empty or blank')
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('POST', 'https://skylabcoders.herokuapp.com/api/auth', undefined, { username: email, password }, result => {
    if (result.error)
      callback(new Error(result.error))
    else {
      const { data: { id, token } } = result

      callback(undefined, { id, token })
    }
  })
}
