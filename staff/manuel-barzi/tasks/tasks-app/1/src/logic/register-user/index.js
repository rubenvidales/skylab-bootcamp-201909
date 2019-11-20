const call = require('../../utils/call')
const { validate } = require('tasks-util')
const { env: { REACT_APP_API_URL: API_URL } } = process

module.exports = function (name, surname, email, username, password) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const res = await call(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, username, password })
        })

        if (res.status === 201) return

        throw new Error(JSON.parse(res.body).message)
    })()
}