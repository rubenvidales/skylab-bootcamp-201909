class Register extends Component {
    constructor(container) {
        super(container)
    }

    get feedback() {
        return this.__feedback__
    }

    set onSubmit(expression) {
        const form = document.getElementsByClassName('register__form')[0]
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const { 
                name: { value: name },
                surname: { value: surname },
                email: { value: email },
                password: { value: password }
            } = this
            expression(name, surname, email, password)        
        });
    }

    hide() {
        const form = this.container.getElementsByTagName('form')[0]
        
        const { name, surname, email, password } = form

        name.value = ''
        surname.value = ''
        email.value = ''
        password.value = ''

        this.feedback.hide()

        super.hide()
    }
}