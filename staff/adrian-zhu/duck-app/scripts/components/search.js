class Search extends Component {
    constructor(container) {
        super(container)

    }

    set onSubmit(expression) {


        this.container.addEventListener('submit', function (event) {
            event.preventDefault()
        
            const duckQuery = document.getElementsByClassName('uploaded__input')[0];
            const url = duckQuery.value;
            expression(url);
        })
    }
}