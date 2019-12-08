const call = require('../../utils/call')
const { validate, errors: { CredentialsError } } = require('quickshare-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (username, password) {
debugger
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const res = await call(`${API_URL}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        if (res.status === 200) return JSON.parse(res.body).token
        
        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}

