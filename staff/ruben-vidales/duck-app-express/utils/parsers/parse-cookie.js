module.exports = function (req) {
    const { headers: { cookie } } = req

    req.cookies = {}

    const keyValues = cookie.split(';')

    keyValues.forEach(keyValue => {
        const [key, value] = keyValue.trim().split('=')

        req.cookies[key] = value
    })
}