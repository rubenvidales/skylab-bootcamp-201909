const Feedback = require('../feedback')

module.exports = function () {
    return `<section class="view register">
    <form class="register__form" method="post" action="/register">
        <h1 class="register__title">Register</h1>
        <input class="register__field" type="text" name="name" placeholder="name" />
        <input class="register__field" type="text" name="surname" placeholder="surname" />
        <input class="register__field" type="email" name="email" placeholder="e-mail" />
        <input class="register__field" type="password" name="password" placeholder="password" />
        <button class="register__submit">📨</button>
        <a class="register__back" href="/">Go back</a>
    </form>

    ${Feedback()}
</section>`
}