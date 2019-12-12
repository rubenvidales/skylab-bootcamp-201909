const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('quickshare-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function ( token, url ) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(url)
    validate.url(url)
    validate.string.notVoid('url', url)

    return (async () => {
        const res = await call(`${API_URL}/rss`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        })
        
        if (res.status === 201) {
            const rss = JSON.parse(res.body)
            return rss
        }
        
        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}