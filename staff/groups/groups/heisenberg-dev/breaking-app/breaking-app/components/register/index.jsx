/**
 * 
 * @param {Function} onBack takes you back to the previous window
 * @param {Function} onRegister makes the register of your user
 * @param {Function} error shows the error measage
 */

function Register({ onBack, onRegister, error }) {
    return <section className="register">
        <h2 className="register__title">Register</h2>
        <RegisterForm back={onBack} onAction={onRegister} button={'Register'}/>
    {error && <Feedback message={error} />}
    </section>
}