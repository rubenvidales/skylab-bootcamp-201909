class Login extends Component {
    constructor(container) {
        super(container)
        
    }

    set onSubmit(expression) {
        
        this.container.addEventListener('submit', function (event) {
            
            event.preventDefault();
    
            const email = this.email.value;
            const password = this.password.value;
            
            expression(email, password); //se llama en main, register.onSubmit
        });
    }

    set onBack(expression) {
        const backButton = this.container.getElementsByClassName('back-button')[0]

        backButton.addEventListener('click', function(e) {
            e.preventDefault()
            expression()
        })
    }

    
    hide() { // to debug
        const form = this.container.getElementsByTagName('form')[0]
        
        const { email, password } = form

        email.value = ''
        password.value = ''

        this.feedback.hide()

        super.hide()
    }


}

