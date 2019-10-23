class Detail extends Component {
    constructor(container) {
        super(container);
    }

    onBack = undefined;

    render = function(item) {

        const header = this.container.getElementsByClassName('header')[0];
        const main = this.container.getElementsByClassName('main')[0];


        const title = main.getElementsByClassName('article__title')[0];
        title.innerText = item.title;

        const image = main.getElementsByClassName('article__image')[0];
        image.src = item.imageUrl;

        const price = main.getElementsByClassName('article__price')[0];
        price.innerText = item.price;


        const description = main.getElementsByClassName('article__description')[0];
        description.innerText = item.description;



        const back = this.container.getElementsByClassName('result__header')[0];
        back.addEventListener('click', this.onBack);
        this.show();

    }
}