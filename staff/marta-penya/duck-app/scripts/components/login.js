class Login extends Component {
    constructor(container){
        super(container)
        this.__feedback__ = new Feedback(container.getElementsByTagName('section')[0])
    }

    get feedback(){
        return this.__feedback__
    }

    set onSubmit(expression){
        const form = this.container.getElementsByTagName('form')[0]

        form.addEventListener('submit', function(event){
            event.preventDefault()

            const {email: {value: email}, password: {value: password}} = this

            expression(email, password)
        })
    }

    set onGoRegistrer(expression){
        const button = this.container.getElementsByClassName('login__goregistrer')[0]

        button.addEventListener('click', event => {
            event.preventDefault()

            expression()
        })
    }

    hide(){
        const form = this.container.getElementsByClassName('login__form')[0]

        const {email, password} = form

        email.value = ''
        password.value = ''

        this.feedback.hide()

        super.hide()
    }
}
