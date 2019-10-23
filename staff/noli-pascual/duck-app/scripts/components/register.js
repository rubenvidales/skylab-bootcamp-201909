class Register extends Component {
    
        constructor(container) {
            super(container)
        }
    
        set onSubmit(expression) {
            
        this.container.addEventListener('submit', function (event) {
                event.preventDefault()
                console.log(this)
        
                const name = this.name.value
                const surname = this.surname.value
                const email= this.email.value
                const password = this.password.value
                //to do destructuring
                
                expression(name, surname, email, password) //se llama en main, register.onSubmit
            })
        }
    
        set onBack(expression) {
            const backButton = this.container.getElementsByClassName('back-button')[0]
    
            backButton.addEventListener('click', (e) => {
                e.preventDefault()
                expression()
            })
        }
    
        hide() {
            const form = this.container.getElementsByTagName('form')[0]
            
            const { name, surname, email, password } = form
    
            name.value = ''
            surname.value = ''
            email.value = ''
            password.value = ''
    
            feedback.hide()
    
            super.hide()
        }
    
    }
    
    