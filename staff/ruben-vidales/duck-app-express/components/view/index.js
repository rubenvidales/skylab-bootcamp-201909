module.exports = function ({body}) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Duck App</title>
        <link rel="stylesheet" href="index.css">
        <link rel="shortcut icon" href="icon.png" type="image/x-icon">
    </head>
    
    <body>
    <header class="header">
        <a class="logo-bloc" href="/">
            <img class="logo-bloc__img" src="logo.png" />
        </a>
    </header>
    <main>
        ${body}
    </main>
    <footer>
        <p class="footer__copyright">Ru for Skylab - 2019</p>
    </footer>
    </body>
</html>`
}