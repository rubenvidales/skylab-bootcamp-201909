const Feedback = require('../feedback')
const Results = require('../results')
const ResultItem = require('../result-item')

module.exports = function ({path, query, name, logout, error, results, favPath, detailPath}) {
    return `<section class="ducks-panel view">
    <form class="search__logout-form" method="post" action="${logout}">
        <span class="search__user">${name}!</span>
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