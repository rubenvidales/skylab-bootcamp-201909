class Search extends Component {
    constructor(container){
        super(container)

        this.__feedback__ = new Feedback(container.getElementsByTagName('section')[0])
    }

    get feedback(){
        return this.__feedback__
    }

    set onSubmit(expression){
        const form = this.container.getElementsByTagName('form')[0]

        form.addEventListener('submit', function(event){
            event.preventDefault()

            const query = this.query.value
            
            expression(query)
        })
    }
}