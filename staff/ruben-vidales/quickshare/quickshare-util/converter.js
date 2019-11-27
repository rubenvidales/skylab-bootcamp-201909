const converter = {
    stringToSeconds(target) {
        const pieces = target.split(':')
        return (+pieces[0]) * 60 * 60 + (+pieces[1]) * 60 + (+pieces[2])
    },
    secondsToString(seconds) {
        return new Date(seconds * 1000).toISOString().substr(11,8)
    }
}

module.exports = converter