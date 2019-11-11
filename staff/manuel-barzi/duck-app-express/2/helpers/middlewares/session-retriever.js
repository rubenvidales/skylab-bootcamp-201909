const retrieveSession = require('../retrievers/retrieve-session')

module.exports = function(sessions) {
    return function (req, res, next) {
        req.session = retrieveSession(req, sessions)
    
        next()
    }
}
