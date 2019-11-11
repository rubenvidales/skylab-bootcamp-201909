module.exports = function({ item: { id, title, image, description, price, link, isFav }, backPath, favPath }) {
    return `<section class="view detail">
        <h2 class="detail__title">${title}</h2>
        <img class="detail__image" src=${image} />
        <p class="detail__description">${description}</p>
        <a class="detail__store" href=${link}>Go to store</a>
        <span class="detail__price">${price}</span>
        <span class="detail__fav">
            <form method="post" action="${favPath}">
                <input type="hidden" name="id" value="${id}">
                <button type="submit">${isFav ? '🧡' : '💔'}</button>
            </form>
        </span>
        <a class="detail__back" href="${backPath}">Go back</a>
    </section>`
}