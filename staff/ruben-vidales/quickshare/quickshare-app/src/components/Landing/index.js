import React from 'react'
import './index.sass'

export default function ({ onRegister, onLogin }) {
    return <section className="landing">
        <div className="landing__container">
            <h1 className="landing__title">QuickShare<br />Podcast</h1>
            <img className="landing__logo" src="./images/quickshare_medium.png" alt="quickshare logo" />
            <form className="landing__register-form" action="#" onSubmit={event => {
                event.preventDefault()
                onRegister()
            }}>
                <input className="landing__register-button" type="submit" value="Register" />
            </form>
            <form className="landing__login-form" action="#" onSubmit={event => {
                event.preventDefault()
                onLogin()
            }}>
                <input className="landing__login-button" type="submit" value="Login" />
            </form>
        </div>
    </section>
}