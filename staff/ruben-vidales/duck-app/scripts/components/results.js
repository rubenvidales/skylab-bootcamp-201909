class Results extends Component {
    constructor(container) {
        super(container)

        container.innerHTML = ''
    }

    onItemRender() { }

    render(results) {
        this.container.innerHTML = ''

        results.forEach(result => {
            var item = this.onItemRender()

            item.render(result)

            this.add(item)
        })
    }
}