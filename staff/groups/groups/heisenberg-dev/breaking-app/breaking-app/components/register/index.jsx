function Register({ onBack, onRegister }) {
    return <section className="register">
        <h2 className="register__title">Register</h2>
        <Form back={onBack} onAction={onRegister} button={'Register'}/>
    </section>
}