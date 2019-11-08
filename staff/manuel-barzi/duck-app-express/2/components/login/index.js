const Feedback = require('../feedback')

module.exports = function ({ path, error }) {
    return `<section class="view login">
    <form method="post" action="${path}">
        <h1 class="login__title">Login</h1>
        <input class="login__field" type="email" name="email" placeholder="e-mail">
        <input class="login__field" type="password" name="password" placeholder="password">
        <button class="login__submit">🗝</button>
    </form>

    ${error ? Feedback({ message: error }) : ''}
</section>`
}