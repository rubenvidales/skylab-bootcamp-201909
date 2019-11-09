const delay = require('./delay')
const salute = require('./salute')

// $ node . 3000 en Juanito

const { argv: [, , millis, lang, name] } = process

delay(Number(millis), () => console.log(salute(lang, name)))


