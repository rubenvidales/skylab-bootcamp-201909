module.exports = function (view) {
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
        <a class="logo-bloc" href="index.html">
            <img class="logo-bloc__img" src="logo.png" />
        </a>
    </header>
    <main>
        ${view}
    </main>
    </body>
</html>`
}