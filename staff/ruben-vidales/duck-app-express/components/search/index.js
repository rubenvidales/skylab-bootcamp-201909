const Feedback = require('../feedback')
const Results = require('../results')
const ResultItem = require('../result-item')

module.exports = function ({path, query, name, logout, error, results, favPath, detailPath, favListPath}) {
    return `<section class="ducks-panel view">
    <p class="search__user">Hi, ${name}!</p>
    <form class="search__favlist-form" method="post" action="${favListPath}">
        <button class="search__favlist-button">Fav List</button>
    </form>
    <form class="search__logout-form" method="post" action="${logout}">    
        <button class="search__logout-button">🚪</button>
    </form>
    <h2 class="search__title">Search</h2>
    <form class="search__form form" method="get" action="${path}">
        <div class="form__part">
            <input class="form__part-input" name="q" placeholder="criteria" ${query ? `value=${query}` : '' }>
            <button class="form__part-button">🔎</button>
        </div>
    </form>
    ${error ? Feedback({ message:error }) : ''}

    ${results ? Results({ items: results, onItemRender: duck => ResultItem({ item: duck, favPath, detailPath }) }) : ''}
</section>`
}