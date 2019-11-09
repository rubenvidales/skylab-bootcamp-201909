class Login extends Component {
    constructor(container) { 
        super(container)
        
    }

    set onSubmit(expression) {
        
        this.container.addEventListener('submit', function (event) {
            event.preventDefault()

            const { email: { value: email }, password: { value: password } } = this

            expression(email, password)
        })
    }

    hide() {
        
        const { email, password } = this.container;

        email.value = ''
        password.value = ''

        this.feedback.hide()

        super.hide()
    }

}