const express = require('express')
const fs = require('fs')
const Login = require('./components/login')
const querystring = require('querystring')

const { argv: [, , port = 8080] } = process

const app = express()

app.get('/hello-world', (req, res) => {
    //res.setHeader('content-type', 'text/plain')
    res.send('<h1>Hola, Mundo!</h1>')
})

app.get('/search', (req, res) => {
    const { query: { q } } = req // req.query.q

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Search</title>
    </head>
    <body>
        <h1>${q}</h1>
    </body>
    </html>`)
})

app.get('/login', (req, res) => {
    const { query: { q } } = req // req.query.q

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Login</title>
        <link href="skylab-icon.png" type="image/png" rel="Shortcut Icon">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        ${Login()}
    </body>
    </html>`)
})

app.post('/login', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    // req.on('end', () => res.send(content))

    // OR
    // req.pipe(res)

    req.on('end', () => {
        // email=manuelbarzi%40gmail.com&password=123

        const { email, password } = querystring.parse(content)

        res.send(`${email} and ${password} :P`)
    })
})

// app.get('/style.css', (req, res) => {
//     const rs = fs.createReadStream('public/style.css')

//     rs.pipe(res)
// })

app.use(express.static('public'))

app.listen(port)