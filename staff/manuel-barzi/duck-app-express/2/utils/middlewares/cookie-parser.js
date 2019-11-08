const { parseCookie } = require('../parsers')

module.exports = function (req, res, next) {
    req.cookies = parseCookie(req)

    next()
}