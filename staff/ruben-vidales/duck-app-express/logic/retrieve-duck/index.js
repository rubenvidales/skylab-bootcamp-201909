const call = require('../../helpers/call')
const validate = require('../../utils/validate')

function retrieveDuck(id, token, duckId) {
    validate.string(id)
    validate.string.notVoid(id)

    call('GET', token, 'https://skylabcoders.herokuapp.com/api/user/' + id, undefined, function (result) {
        const { data: { favs } } = result

        call('GET', undefined, 'https://duckling-api.herokuapp.com/api/ducks/' + duckId, undefined, function (result) {
            if (result.error)
                callback(new Error(result.error))
            else {
                result.image = result.imageUrl

                delete result.imageUrl

                result.fav = favs.includes(result.id)

                callback(undefined, result)
            }
        })

    })
}