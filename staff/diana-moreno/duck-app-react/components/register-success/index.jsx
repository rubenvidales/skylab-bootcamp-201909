function RegisterSuccess({ onBack }) {
  return (
    <section className='view view__registerSuccess'>
      <img className='view__registerSuccess--image' src="./images/pato-madre-plana-sentirse-feliz-patitos_23-2148281518.jpg" alt="" />
      <h2 className='view__registerSuccess--title'>You have successfully registered!</h2>
      <button className='form__button form__button--register-back'
        onClick={event => {
            event.preventDefault()

            onBack()
        }}
      >Back to login</button>
    </section>
  )
}
