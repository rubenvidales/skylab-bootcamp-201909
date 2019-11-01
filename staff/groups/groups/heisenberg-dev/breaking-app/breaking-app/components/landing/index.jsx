/**
 * 
 * @param {function} onRegister  evento click to view platform register
 * @param {function} onLogin event click to view platform login
 */

 function Landing({ onRegister, onLogin }) {
    return <section className="landing">
        <h3 className="landing__title">Welcome to the best Breaking Bad Wiki page 🧪</h3>
        <p className="landing__options">Please, proceed to <a href="" onClick={event => {
            event.preventDefault()

            onRegister()
        }}>Register</a> or <a href="" onClick={event => {
            event.preventDefault()

            onLogin()
        }}>Login</a>.</p>
    </section>
}