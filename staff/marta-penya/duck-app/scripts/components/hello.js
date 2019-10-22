class Hello extends Component {
    constructor(container) {
        super(container)
    }

    render(result) {
        const message = this.container.getElementsByClassName('hello__user')[0]
        message.innerText = `hello ${result.data.name}`

        this.show()
    }
    set onBack(expression){
        const button = this.container.getElementsByClassName('hello__button')[0]

        button.addEventListener('click', event => {
            event.preventDefault()

            expression()
        })
    }
}