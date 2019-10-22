function Landing({ onRegister, onLogin }) {
    return <section className="view landing">
        <h1 className="landing__title">Welcome to Duck App 🐥</h1>
        <p className="landing__options">Please, proceed to <a href="" onClick={event => {
            event.preventDefault()

            onRegister()
        }}>Register</a> or <a href="" onClick={event => {
            event.preventDefault()

            onLogin()
        }}>Login</a>.</p>
    </section>
}