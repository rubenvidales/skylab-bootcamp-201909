function Landing({ onRegister, onLogin }) {
    return <section className="view landing">
        <p className="landing__options">Please, proceed to <a href="" onClick={event => {
            event.preventDefault()

            onRegister()
        }}>Register</a> or <a href="" onClick={event => {
            event.preventDefault()

            onLogin()
        }}>Login</a>.</p>
    </section>
}