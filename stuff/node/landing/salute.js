module.exports = function (lang, name) {
    switch (lang) {
        case 'en':
            return `Hello, ${name}!`
        case 'es':
            return `Hola, ${name}!`
        case 'ca':
            return `Hola, ${name}!`
        case 'it':
            return `Ciao, ${name}!`
        case 'fr':
            return `Bonjour, ${name}!`
        case 'de':
            return `Hallo, ${name}!`
    }
}