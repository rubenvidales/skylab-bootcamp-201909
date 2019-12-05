const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('quickshare-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function ( id, title, url, description, imageUrl, language ) {

    console.log(id, title, url, description, imageUrl, language)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(url)
    validate.url(url)
    validate.string.notVoid('url', url)
    validate.string(description)
    validate.string.notVoid('description', description)
    validate.string(imageUrl)
    validate.string.notVoid('imageUrl', imageUrl)
    validate.string(language)
    validate.string.notVoid('language', language)

    return (async () => {
        const res = await call(`${API_URL}/rss`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, url, description, imageUrl, language })
        })
        if (res.status === 201) return
        
        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}