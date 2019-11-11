class Landing extends Component {
    constructor(container) { super(container) }

    set onRegister(expression) {
        const link = this.container.getElementsByTagName('a')[0]

        link.addEventListener('click', event =>{
            event.preventDefault()

            expression()
        })
    }

    set onLogin(expression) {
        const link = this.container.getElementsByTagName('a')[1]

        link.addEventListener('click', event =>{
            event.preventDefault()

            expression()
        })
    }
}