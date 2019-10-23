class Register extends Component {
    constructor(container) {
        super(container);
        this.__feedback__ = new Feedback(container.getElementsByTagName('feedback')[0])

    }

    get feedback() {
        return this.__feedback__
    }

    hide() {
        const form = this.container.getElementsByTagName('register__form')[0]

        const { name, surname, email, password } = form

        name.value = ''
        surname.value = ''
        email.value = ''
        password.value = ''

        this.feedback.hide()

        super.hide()
    }

    onSubmit(callback) {
        this.container.addEventListener('submit', function(event) {
            event.preventDefault();
            const form = this.getElementsByClassName('register__form')[0];
            const { name: { value: name }, lastName: { value: lastName }, mail: { value: mail }, password: { value: password }, age: { value: age } } = form;
            callback(name, lastName, mail, password, age);
        });
    }

    clearFields() {
        const form = this.container.getElementsByClassName('register__form')[0];
        form.name.value = '';
        form.lastName.value = '';
        form.mail.value = '';
        form.password.value = '';
        form.age.value = '';
    }
}