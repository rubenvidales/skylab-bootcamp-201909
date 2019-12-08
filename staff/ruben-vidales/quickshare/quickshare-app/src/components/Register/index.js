import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({ error, onClose, onRegister, onBack }) {
    return <section className="register">
        <div className="register__container">
            <img className="register__logo" src="./images/quickshare_medium.png" alt="quickshare logo" />
            <h2 className="register__title">Register</h2>
            <form className="register__form" onSubmit={
                event => {
                    event.preventDefault()
                    const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, password: { value: password } } = event.target
                    onRegister(name, surname, email, username, password)
                }
            }>
                <input type="text" className="register__form-input" name="username" placeholder="Username" />
                <input type="email" className="register__form-input" name="email" placeholder="Email" />
                <input type="text" className="register__form-input register__form-input--separator" name="name"
                    placeholder="Name" />
                <input type="text" className="register__form-input" name="surname" placeholder="Surname" />
                <input type="password" className="register__form-input register__form-input--separator" name="password"
                    placeholder="Password" />
                <input type="password" className="register__form-input" name="re_password"
                    placeholder="Repeat Password" />
                <input className="register__form-submit-button" type="submit" value="Register" />
                <button className="register__form-cancel-button" href="#" onClick={event => {
                    event.preventDefault()
                    onBack()
                }}>Cancel</button>
            </form>
        </div>
        {error && <Feedback message={error} onClose={onClose} />}
    </section>
}