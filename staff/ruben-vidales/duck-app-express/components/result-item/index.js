module.exports = function ({ item: { id, title, image, price, isFav }, favPath, detailPath }) {
    return `<li class="results__list-item">
        <a href="${`${detailPath}/${id}`}" class="item">
            <article class="duck">
                <h2 class="duck__title">${title}</h2>
                <img class="duck__image" src=${image} />
                <p class="duck__paragraph">
                <span class="duck__price">${price}</span>
                </p>
                <form class="duck__fav" method="post" action="${favPath}">
                    <input type="hidden" name="id" value="${id}">
                    <button type="submit">${isFav ? '🧡' : '💔'}</button>
                </form>
            </article>
        </a>
    </li>`
}