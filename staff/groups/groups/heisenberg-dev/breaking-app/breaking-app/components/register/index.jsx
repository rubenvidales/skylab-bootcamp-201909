function Register({ onBack }) {
    return <section className="register">
        <h2 className="register__title">Register</h2>
        <form className="register__form">
            <input className="register__field" type="text" name="name" placeholder="name" />
            <input className="register__field" type="text" name="surname" placeholder="surname" />
            <input className="register__field" type="email" name="email" placeholder="e-mail" />
            <input className="register__field" type="password" name="password" placeholder="password" />
            <div className="break"></div>
            <button className="register__submit">Register me!</button>
            <button className="register__goback" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go back</button>
        </form>
    </section>
}