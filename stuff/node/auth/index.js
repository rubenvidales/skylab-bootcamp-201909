const jwt = require('jsonwebtoken')

const payload = {
    sub: 'user-id-123'
}

const secret = 'my grandmas dad - from the side of my dad - had double life'

const token = jwt.sign(payload, secret, { expiresIn: '10s' })

debugger

try {
    //const _payload = jwt.verify(token, secret)
    const _payload = jwt.verify(token.toUpperCase(), secret) // ERROR token manipulated (uppercased)

    debugger
} catch (error) {
    debugger
}


