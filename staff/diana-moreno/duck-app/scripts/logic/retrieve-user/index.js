function retrieveUser(id, token) {
  if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
  if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

  call('GET', 'https://skylabcoders.herokuapp.com/api/user/' + id, { 'Authorization': 'Bearer ' + token }, undefined, result => {
    if (result.error)
      callback(new Error(result.error))
    else {
      const { data: { id, name, surname, username } } = result
      console.log(id, name, surname, username)
      let greeting = document.getElementsByClassName('header__greeting')[0]
      greeting.innerHTML = 'Hello ' + name
    }
  })
}
