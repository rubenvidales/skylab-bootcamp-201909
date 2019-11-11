class Results extends Component {
    constructor(container) {
        super(container)

        container.innerHTML = ''
        this.render = this.render.bind(this)
    }

    onItemRender() { }

    render(results) {
        this.container.innerHTML = '';

        results.forEach(function (result) {
            const item = this.onItemRender()
            item.render(result)
            this.add(item)
        }.bind(this));
    }
}