module.exports = function({ item: { id, title, image, price, isFav } }) {
    return `<li class="results__item">
        <a href="#" class="item-dark">
            <h2 class="item-dark__title">${title}</h2>
            <img class="item-dark__image" src=${image} />
            <span class="item-dark__price">${price}</span>
            <span class="item-dark__fav">${isFav ? '🧡' : '💔'}</span>
        </a>
    </li>`
}