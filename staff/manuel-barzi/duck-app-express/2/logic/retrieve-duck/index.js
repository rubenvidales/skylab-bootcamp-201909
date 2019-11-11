const validate = require('../../utils/validate')
const call = require('../../helpers/call')

module.exports = function (id, token, duckId, callback) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(token)
    validate.string.notVoid('token', token)
    validate.string(duckId)
    validate.string.notVoid('duck id', duckId)

    return new Promise((resolve, reject) =>
        call('GET', undefined, `https://duckling-api.herokuapp.com/api/ducks/${duckId}`, undefined, result => {
            if (result.error) return reject(new Error(result.error))

            call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result2 => {
                if (result2.error) return reject(new Error(result2.error))

                const { data: { favs = [] } } = result2

                result.image = result.imageUrl

                delete result.imageUrl

                result.isFav = favs.includes(result.id)

                resolve(result)
            })
        })
    )
}