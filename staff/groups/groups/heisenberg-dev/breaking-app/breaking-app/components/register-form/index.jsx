/**
 * 
 * @param {function} back return previous view
 * @param {function} onAction event to register user
 * @param {string} button makes appear the 'Register' name on the button
 */

function RegisterForm({ back, onAction, button }) {
    return <form className="register__form" onSubmit={function (event) {
        event.preventDefault()

        const { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } = event.target

        onAction(name, surname, email, password)
    }}>
        <input className="register__field" type="text" name="name" placeholder="name" />
        <input className="register__field" type="text" name="surname" placeholder="surname" />
        <input className="register__field" type="email" name="email" placeholder="e-mail" />
        <input className="register__field" type="password" name="password" placeholder="password" />
        <div className="break"></div>
        <button className="register__submit">{button} me!</button>
        <button className="register__goback" onClick={event => {
            event.preventDefault()

            back()
        }}>Go back</button>
    </form>
}