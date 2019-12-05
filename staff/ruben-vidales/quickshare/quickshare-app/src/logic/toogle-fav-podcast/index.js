const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('quickshare-util')
const { ObjectId } = require('quickshare-data')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, userId, podcastId) {
    validate.string(token)
    validate.string.notVoid('token', token)

    return (async () => {
        const res = await call(`${API_URL}/users/favs`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, podcastId })
        })

        if (res.status === 200) {
            const user = JSON.parse(res.body)

            user.lastAccess = new Date(user.lastAccess)

            return user
        }

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)

        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}