const Feedback = require('../feedback')

module.exports = function ({ path, query, name, logout }) {
    return `<section class="view search">
    <h1 class="search__title">Search</h1>
    <h2 class="search__user">${name}</h2><form method="post" action="${logout}"><button class="search__logout">Logout</button></form>
    <form class="search__form" method="get" action="${path}">
        <span class="search__icon">🐣</span>
        <input class="search__criteria" type="text" name="q" placeholder="criteria" ${query? `value=${query}` : '' }>
        <button class="search__submit">🔍</button>
    </form>

    ${Feedback()}
</section>`
}