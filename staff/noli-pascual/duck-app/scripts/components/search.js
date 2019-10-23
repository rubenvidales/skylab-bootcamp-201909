class Search extends Component {
    constructor(container) {
        //del primer padre de todos
        super(container) //coge el container

    }

    set onSubmit(expression) {

        this.container.addEventListener('submit', function (event) {
            event.preventDefault();
    
            const query = this.query.value;
    
            expression(query);
        });

    }
}



// function Search(container) {
//     Component.call(this, container);
// }

// Search.extend(Component);

// Search.prototype.onSubmit = function (expression) {
//     this.container.addEventListener('submit', function (event) {
//         event.preventDefault();

//         var query = this.query.value;

//         expression(query);
//     });
// };