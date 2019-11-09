module.exports = function ({ item: { id, title, image, price, isFav }, favPath, detailPath }) {
    return `<li class="results__item">
        <a href="${`${detailPath}/${id}`}" class="item">
            <h2 class="item__title">${title}</h2>
            <img class="item__image" src=${image} />
            <span class="item__price">${price}</span>
            <span class="item__fav">
                <form method="post" action="${favPath}">
                    <input type="hidden" name="id" value="${id}">
                    <button type="submit">${isFav ? '🧡' : '💔'}</button>
                </form>
            </span>
        </a>
    </li>`
}