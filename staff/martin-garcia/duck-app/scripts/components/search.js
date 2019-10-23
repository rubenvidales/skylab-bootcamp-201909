class Search extends Component {
    constructor(container) {
        super(container);
    }
    onSubmit = function(expression) {
        const form = this.container.getElementsByClassName('myForm')[0];
        form.addEventListener('submit', event => {
            event.preventDefault();
            debugger
            const query = this.container.getElementsByClassName('myForm')[0].query.value;
            expression(query);
        });
    };
}