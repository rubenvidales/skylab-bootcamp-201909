class Detail extends Component {
    constructor(container) {
        super(container)
    }

    set onBack(expression) {
        const link = this.container.getElementsByTagName('a')[1]

        link.addEventListener('click', event =>{
            event.preventDefault()

            expression()
        })
    }
    
    render(item) {
        const title = this.container.getElementsByClassName('detail__title')[0]
        title.innerText = item.title
    
        const image = this.container.getElementsByClassName('detail__image')[0]
        image.src = item.imageUrl
    
        const description = this.container.getElementsByClassName('detail__description')[0]
        description.innerText = item.description
    
        const store = this.container.getElementsByClassName('detail__store')[0]
        store.href = item.link
    
        const price = this.container.getElementsByClassName('detail__price')[0]
        price.innerText = item.price
    
        const back = this.container.getElementsByClassName('detail__back')[0]
        back.addEventListener('click', this.onBack)

        this.show()
    }
}
