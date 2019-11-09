function Register({ onRegister, onBack, error}) {
  return(
    <section className='view view__register'>
      <img className='view__register--image' src="./images/pato-goma-amarillo-plano-brillante_23-2148275403.jpg" alt="" />
      <h2 className='view__register--title'>Please, introduce your details</h2>
      <form className="form form--login" method="POST"
        onSubmit={function (event) {
          event.preventDefault()
          const { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } = event.target
          onRegister(name, surname, email, password)
      }}>
        <input className='form__input' type="text" name="name"
          placeholder="name" />
        <input className='form__input' type="text" name="surname"
          placeholder="surname" />
        <input className='form__input' type="text" name="email"
          placeholder="email" />
        <input className='form__input' type="password" name="password"
          placeholder="password" />
        <button className='form__button form__button--register'>Create account</button>
      </form>
      <button className='form__button form__button--register-back'
        onClick={event => {
          event.preventDefault()
          onBack()
        }}>Back to login
      </button>
      <div className='feedback'>
        {error && <Feedback message={error} />}
      </div>
    </section>
  )
}
