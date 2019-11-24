import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function({ onRegister, onBack, error }) {
    return <section className="view register _hide">
        <form onSubmit={function (event) {
            event.preventDefault()

            const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, password: { value: password } } = event.target

            onRegister(name, surname, email, username, password)
        }}>
            <h1 className="register__title">Register</h1>
            <input className="register__field" type="text" name="name" placeholder="name" />
            <input className="register__field" type="text" name="surname" placeholder="surname" />
            <input className="register__field" type="email" name="email" placeholder="e-mail" />
            <input className="register__field" type="username" name="username" placeholder="username" />
            <input className="register__field" type="password" name="password" placeholder="password" />
            <button className="register__submit">📨</button>
            <a className="register__back" href="" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go back</a>
        </form>

        {error && <Feedback message={error} />}
    </section>
}