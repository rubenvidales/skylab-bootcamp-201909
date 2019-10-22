class ResultItem extends Component {
    constructor(container){
        super(container)

        container.classList.add('item-list__li')
    }

    onClick() { }

    render = function (result){
        const item = document.createElement('a')
        item.classList.add('item-list__link')

        item.addEventListener('click', () => {
            const id = result.id

            this.onClick(id)
        })

        const h2 = document.createElement('h2');
        const text = document.createTextNode(result.title);
        h2.classList.add('item-list__title');
        h2.appendChild(text);
    
        const img = document.createElement('img');
        img.classList.add('item-list__image');
        img.src = result.imageUrl;
    
        const price = document.createElement('p');
        const pric = document.createTextNode(result.price);
        price.classList.add('item-list__price');
        price.appendChild(pric);
    
        item.append(h2, img, price);
    
        this.container.append(item);
    }

}

