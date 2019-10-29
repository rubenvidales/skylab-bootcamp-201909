function Profile({ onBack, onEdit }) {
    return <section className="register">
        <h2 className="register__title">Edit profile</h2>
        <Form back={onBack} onAction={onEdit} button={'Edit'}/>
    </section>
}