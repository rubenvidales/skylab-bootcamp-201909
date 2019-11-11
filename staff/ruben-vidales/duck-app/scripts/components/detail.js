class Detail extends Component {
    constructor(container) {
        super(container)
    }

    render(duck) {
        this.__container__.innerHTML = ''

        const article = document.createElement('article')
        article.classList.add('duck')

        const title = document.createElement('h3')
        title.classList.add('duck__title')
        title.innerText = duck.title

        const img = document.createElement('img')
        img.classList.add('duck__image')
        img.src = duck.imageUrl

        const descript = document.createElement('p')
        descript.classList.add('duck__description')
        descript.innerText = duck.description

        const price = document.createElement('p')
        price.classList.add('duck__price')
        price.innerText = duck.price

        const store = document.createElement('a')
        store.classList.add('duck__store-button')
        store.innerText = 'Go to Shop'
        store.href = duck.link
        store.setAttribute('target', '_blank')

        const back = document.createElement('a')
        back.classList.add('duck__back-button')
        back.innerText = 'Back'
        back.addEventListener('click', this.onBack)

        article.append(title)
        article.append(img)
        article.append(descript)
        article.append(store)
        article.append(price)
        article.append(back)

        this.__container__.append(article)
    }
}