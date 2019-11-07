const Feedback = require('../feedback')

module.exports = function ({ path }) {
    return `<section class="view register">
    <form method="post" action="${path}">
        <h1 class="register__title">Register</h1>
        <input class="register__field" type="text" name="name" placeholder="name">
        <input class="register__field" type="text" name="surname" placeholder="surname">
        <input class="register__field" type="email" name="email" placeholder="e-mail">
        <input class="register__field" type="password" name="password" placeholder="password">
        <button class="register__submit">📨</button>
    </form>

    ${Feedback()}
</section>`
}