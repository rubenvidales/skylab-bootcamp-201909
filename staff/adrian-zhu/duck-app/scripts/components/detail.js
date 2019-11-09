class Detail extends Component {
    constructor(container) {
        super(container)
    }
    
    onBack(){};

    render(item) {

        var title = this.container.getElementsByClassName('detail__title')[0];
        title.innerText = item.title;
        
        var image = this.container.getElementsByClassName('detail__image')[0];
        image.src = item.imageUrl;
    
        var description = this.container.getElementsByClassName('detail__description')[0];
        description.innerText = item.description;
    
        var store = this.container.getElementsByClassName('detail__store')[0];
        store.href = item.link;
    
        var price = this.container.getElementsByClassName('detail__price')[0];
        price.innerText = item.price;
    
        var back = this.container.getElementsByClassName('detail__back')[0];
        back.addEventListener('click', this.onBack);

    }
}