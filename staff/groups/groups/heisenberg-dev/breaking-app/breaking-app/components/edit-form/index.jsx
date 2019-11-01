/**
 * platform to register user
 * @param {function} back return to search
 * @param {function} onAction 
 * @param {function} button sendf elements to register
 * @param {object} onData contain elements register user
 * @param {string} name name user
 * @param {string} surname surmane register user
 * @param {string} password unique code to in platform
 */

function Form({ back, onAction, button, onData: { name = '', surname, email, password } }) {
    return <form className="register__form" onSubmit={function (event) {
        event.preventDefault()

        const { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } = event.target

        onAction(name, surname, email, password)
    }}>
        <input className="register__field" type="text" name="name" placeholder="name" value={name} />
        <input className="register__field" type="text" name="surname" placeholder="surname" value={surname} />
        <input className="register__field" type="email" name="email" placeholder="e-mail" value={email} />
        <input className="register__field" type="password" name="password" placeholder="password" value={password} />
        <div className="break"></div>
        <button className="register__submit">{button} me!</button>
        <button className="register__goback" onClick={event => {
            event.preventDefault()

            back()
        }}>Go back</button>
    </form>
}