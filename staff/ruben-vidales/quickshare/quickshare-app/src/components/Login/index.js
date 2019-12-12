import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({ error, onClose, onLogin, onBack }) {
    return <section className="login">
    <div className="login__container">
        <img className="login__logo" src="./images/quickshare_medium.png" alt="quickshare logo"/>
        <h2 className="login__title">login</h2>
        <form className="login__form" onSubmit={ event => {
            event.preventDefault()
            const { username: { value: username }, password: { value: password } } = event.target
            onLogin(username, password)          
        }}>
            <input type="text" className="login__form-input" name="username" placeholder="Username"/>
            <input type="password" className="login__form-input" name="password" placeholder="Password"/>
            <input className="login__form-submit-button" type="submit" value="Login" />
            <button className="login__form-cancel-button" href="#" onClick={event => {
                    event.preventDefault()
                    onBack()
                }}>Cancel</button>
        </form>
    </div>
    {error && <Feedback message={error} onClose={onClose} />}
    </section>
}

