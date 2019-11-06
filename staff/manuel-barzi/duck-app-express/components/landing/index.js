module.exports = function({ register }) {
    return `<section class="view landing">
    <h1 class="landing__title">Welcome to Duck App 🐥</h1>
    <p class="landing__options">Please, proceed to <a href="${register}">Register</a> or <a href="#">Login</a>.</p>
</section>`
}