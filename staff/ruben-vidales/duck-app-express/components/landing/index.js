module.exports = function ({ register, login}) {
    return `<section className="view landing">
    <p class="landing__options">Please, proceed to <a href="${register}">Register</a> or <a href="${login}">Login</a>.</p>
</section>`
}