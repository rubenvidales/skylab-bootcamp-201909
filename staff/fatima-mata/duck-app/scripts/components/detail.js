class Detail extends Component {
    constructor(container) {
        super(container)
    }

    
    render(item) {
        document.getElementsByClassName('details__title')[0].innerText = item.title
        document.getElementsByClassName('details__img')[0].src = item.imageUrl
        document.getElementsByClassName('details__description')[0].innerText = item.description
        document.getElementsByClassName('details__price-tag')[0].innerText = item.price

        // this.show()
    }
}