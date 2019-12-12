const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('quickshare-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, podcastId) {
    validate.string(token)
    validate.string.notVoid('token', token)

    return (async () => {
        const res = await call(`${API_URL}/users/player/playlist`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ podcastId })
        })

        if (res.status === 200) {
            const playlist = JSON.parse(res.body)
            return playlist
        }

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)

        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}