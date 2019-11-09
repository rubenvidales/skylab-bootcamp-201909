class Register extends Component {
    constructor(container) {
        super(container)
    }

    set onSubmit(expression) {
        this.container.addEventListener('submit', function (event) {
            event.preventDefault();
            const { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } = this
            expression(name, surname, email, password)        
        });
    }

    hide() {
        
        const { name, surname, email, password } = this

        name.value = ''
        surname.value = ''
        email.value = ''
        password.value = ''

        this.feedback.hide()

        super.hide()
    }
    
}