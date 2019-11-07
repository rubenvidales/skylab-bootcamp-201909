const Feedback = require('../feedback')

module.exports = function ({path, error}) {
    return `<section class="ducks-panel view">
    <form class="search__logout-form">
        <span class="search__user">Hi USERNAME!</span>
        <button class="search__logout-button">🚪</button>
    </form>
    <h2 class="search__title">Search</h2>
    <form class="search__form form">
        <div class="form__part">
            <input class="form__part-input" name="query" />
            <button class="form__part-button">🔎</button>
        </div>
    </form>
</section>`
}