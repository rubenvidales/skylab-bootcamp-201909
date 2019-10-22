class ResultItem extends Component {
    constructor(container) {
        super(container)

        container.classList.add('results__item')
    }

    onClick() { }

    render = function (result) {
        const item = newElement('a','duck')
        item.href = "#"
        item.dataset.duckId = result.id
        const title = newElement('h2','duck__title',result.title)

        const image = newElement('img','duck__img')
        image.src = result.imageUrl

        const price = newElement('p','duck__price')
        const priceTag = newElement('span','price-tag',result.price)
        price.append(priceTag)
        item.append(title, image, price)

        this.container.append(item);
    }
}