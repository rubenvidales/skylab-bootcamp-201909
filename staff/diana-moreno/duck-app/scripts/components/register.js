class Register extends Component {
  constructor(container) {
    super(container)
  }

  set onSubmit(expression) {
    this.container.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = this.name.value
      const surname = this.surname.value
      const email = this.email.value
      const password = this.password.value

      expression(name, surname, email, password)
    })
  }
}
