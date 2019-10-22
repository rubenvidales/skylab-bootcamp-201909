class Register extends Component {
    constructor(container) {
        super(container)

        this.__feedback__ = new Feedback(container.getElementsByTagName('section')[0])
    }

    get feedback() {
        return this.__feedback__
    }

    set onSubmit(expression) {
        const form = this.container.getElementsByTagName('form')[0]

        form.addEventListener('submit', function (event) {
            event.preventDefault()

            const { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } = this

            expression(name, surname, email, password)
        })
    }

    set onBack(expression) {
        const link = this.container.getElementsByTagName('a')[0]

        link.addEventListener('click', event => {
            event.preventDefault()

            expression()
        })
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