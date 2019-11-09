class ResultItem extends Component {
    constructor(container){
        super(container)
    }

    onClick(){};

    render(results) {
        const item = document.createElement('a');
        item.classList.add('item');
    
        const div = document.createElement('div');
        const link = document.createElement('a')
        const title = document.createElement('h3');
        const img = document.createElement('img');
        const price = document.createElement('p');
        
        link.addEventListener('click', function(e){
            this.onClick(results.id)}.bind(this));
            
        title.innerText = results.title;
        img.src = results.imageUrl;
        price.innerText = results.price;
    
        // results.classList.add = 
        // div.classList.add = 
        // link.classList.add = 
        // title.classList.add = 
        // img.classList.add = 
        // price.classList.add = 
    
        link.append(title, img, price);
        div.append(link)
    
        this.__container__.append(div); // li apapend div
    }
}