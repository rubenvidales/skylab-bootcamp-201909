module.exports = function ({ item: { id, title, image, link, description, price, isFav }, backPath, favPath }) {
    return `<article class="duck">
                <h2 class="duck__title">${title}</h2>
                <img class="duck__image" src=${image} />
                <p class="duck__description">${description}</p>
                <p class="duck__paragraph">
                    <a class="duck__link" href="${link}">Link to store</a>
                </p>
                <p class="duck__paragraph">
                    <span class="duck__price">${price}</span>
                </p>
                <form class="duck__fav" method="post" action="${favPath}">
                    <input type="hidden" name="id" value="${id}">
                    <button type="submit">${isFav ? '🧡' : '💔'}</button>
                </form>
                <p class="duck__paragraph">
                    <a class="duck__link" href="${backPath}">Go Back</a>
                </p>
            </article>`
}