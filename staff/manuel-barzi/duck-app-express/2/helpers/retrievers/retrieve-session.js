module.exports = function(req, sessions) {
    const { cookies: { id }} = req

    const session = sessions[id]

    session && (session.id = id)

    return session
}