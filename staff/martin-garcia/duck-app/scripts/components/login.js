 class Login extends Component {
     constructor(container) {
         super(container);
         this.__feedback__ = new Feedback(container.getElementsByTagName('feedback__message')[0])
     }

     get feedback() {
         return this.__feedback__
     }

     onSubmit(callback) {
         const form = this.container.getElementsByClassName('login__form')[0];
         form.addEventListener('submit', function(event) {
             event.preventDefault();
             const mail = this.mail.value;
             const password = this.password.value;
             callback(mail, password);
         });
     }

     clearFields() {
         const form = this.container.getElementsByClassName('login__form')[0];
         debugger
         form.mail.value = '';
         form.password.value = '';
     }
 }