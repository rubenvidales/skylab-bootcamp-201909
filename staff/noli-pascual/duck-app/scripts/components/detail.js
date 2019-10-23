class Detail extends Component {
    constructor(container) {
        super(container)
        //por ahora solamente las de la clase madre
    }

    onBack() {} //lo estableceremos en la instancia????

    render(item) {

        const title = this.container.getElementsByClassName('detail__title')[0];
        title.innerText = item.title;

        const image = this.container.getElementsByClassName('detail__image')[0];
        image.src = item.imageUrl;

        const description = this.container.getElementsByClassName('detail__description')[0];
        description.innerText = item.description;

        const store = this.container.getElementsByClassName('detail__store')[0];
        store.href = item.link;

        const price = this.container.getElementsByClassName('detail__price')[0];
        price.innerText = item.price;

        const backButton = this.container.getElementsByClassName('detail__back')[0];
        backButton.addEventListener('click', this.onBack);
    } 
}