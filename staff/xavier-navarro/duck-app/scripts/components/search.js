class Search extends Component {
    constructor(container) {
        super(container)
    }

    get feedback() {
        return this.__feedback__
    }

    set onSubmit(expression) {
        const form = document.getElementsByClassName('search__form')[0]

        form.addEventListener('submit', function (event) {
            event.preventDefault()

            const query = this.search.value

            expression(query)
        })
    }
}