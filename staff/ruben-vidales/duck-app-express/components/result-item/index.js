module.exports = function ({ item: { id, title, image, price, isFav }, favPath, detailPath }) {
    return `<li class="results_item">
        <a href="${`${detailPath}/${id}`}" class="item">
            <article class="duck">
            <h2 class="duck__title">${title}</h2>
            <img class="duck__image" src=${image} />
            <span class="duck__price">${price}</span>
            <span class="duck__fav">
                <form method="post" action="${favPath}">
                    <input type="hidden" name="id" value="${id}">
                    <button type="submit">${isFav ? '🧡' : '💔'}</button>
                </form>
            </span>
            </article>
        </a>
    </li>`
}