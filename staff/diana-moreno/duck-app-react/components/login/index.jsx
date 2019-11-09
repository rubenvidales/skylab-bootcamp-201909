function Login({ onLogin, onRegister, error }) {
  return (
    <div className='view view__login'>
      <h1 className='view__login--title'>Duck Store</h1>
      <form onSubmit={event => {
          event.preventDefault()
          const username = event.target.username.value
          const password = event.target.password.value
          onLogin(username, password)
        }}
        className="form form--login" method="POST">
        <input className='form__input' type="text" name="username"
          placeholder="email"/>
        <input className='form__input' type="password" name="password"
          placeholder="password"/>
        <button type='submit' className='form__button form__button--login'>Login</button>
      </form>
      <button onClick={event => {
          onRegister()
        }}
        className='form__button form__button--register'>Create account</button>
      <div className='feedback'>
        {error && <Feedback message={error} />}
      </div>
      <img  className='view__login--image' src="./images/pato-madre-plano-patitos_23-2148282441.jpg" alt="family-ducks"/>
    </div>
  )
}
