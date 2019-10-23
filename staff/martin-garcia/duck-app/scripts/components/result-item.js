class ResultItem extends Component {
    constructor(container) {
        super(container);
        container.classList.add('main__article');
    }
    onClick = undefined;
    render = function(result) {

        const item = document.createElement('a');
        item.classList.add('item');
        item.addEventListener('click', () => {
            const id = result.id;
            this.onClick(id);
        });

        const title = document.createElement('p');
        title.classList.add('article__title');
        title.innerText = result.title;

        const image = document.createElement('img');
        image.classList.add('article__image');
        image.src = result.imageUrl;

        const price = document.createElement('p');
        price.classList.add('article__price');
        price.innerText = result.price;


        item.append(title, image, price);
        this.container.append(item);

    }
}