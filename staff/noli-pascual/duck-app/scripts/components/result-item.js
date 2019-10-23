class ResultItem extends Component {
    constructor(container) {
        super(container) //inicializa con la prop d Component
        container.classList.add('results__item')
    }

    onClick() {} //lo machacaremos en la instancia

    render(result) {

        const item = document.createElement('a')
        item.classList.add('item')

        item.addEventListener('click', () => {
        const id = result.id
        this.onClick(id)
        })

        const title = document.createElement('h2')
        title.classList.add('item__title')
        title.innerText = result.title

        const image = document.createElement('img')
        image.classList.add('item__image')
        image.src = result.imageUrl

        const price = document.createElement('span')
        price.classList.add('item__price')
        price.innerText = result.price

        item.append(title, image, price)

        this.container.append(item)
    }
}



