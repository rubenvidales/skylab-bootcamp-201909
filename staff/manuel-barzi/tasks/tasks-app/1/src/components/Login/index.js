import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function({ onLogin, onBack, error }) {
    return <section className="view login">
        <form onSubmit={function (event) {
            event.preventDefault()

            const { username: { value: username }, password: { value: password } } = event.target

            onLogin(username, password)
        }}>
            <h1 className="login__title">Login</h1>
            <input className="login__field" type="username" name="username" placeholder="username" />
            <input className="login__field" type="password" name="password" placeholder="password" />
            <button className="login__submit">📨</button>
            <a className="login__back" href="" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go back</a>
        </form>

        {error && <Feedback message={error} />}
    </section>
}