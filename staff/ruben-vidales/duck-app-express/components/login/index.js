const Feedback = require('../feedback')

module.exports = function () {
    return `<section class="view login">
    <form class="login__form">
        <h1 class="login__title">Login</h1>
        <input class="login__field" type="email" name="email" placeholder="e-mail" />
        <input class="login__field" type="password" name="password" placeholder="password" />
        <button class="login__submit">📨</button>
        <a class="login__back" href="/">Go back</a>
    </form>

    ${Feedback()}
</section>`
}

