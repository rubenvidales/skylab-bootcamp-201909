function Login({ onBack, onLogin, error }) {
    return <section className="login">
        <h2 className="login__title">Login</h2>
        <form className="login__form" onSubmit={function (event) {
            event.preventDefault()

            const { email: { value: email }, password: { value: password } } = event.target

            onLogin(email, password)
        }}>
            <input className="login__field" type="email" name="email" placeholder="e-mail" />
            <input className="login__field" type="password" name="password" placeholder="password" />
            <div className="break"></div>
            <button className="login__submit">Go!</button>
            <button className="login__goback" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go back</button>
        </form>
    {error && <Feedback message={error} />}
    </section>
}