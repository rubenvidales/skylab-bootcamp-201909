function Search({ user, onEdit, onLogout, onSubmit }) {
    return <section className="search">
        <h3>Hi! {user}</h3> <button className="search__button-edit" onClick={ event => {
            event.preventDefault()
            onEdit()
        }}>Go to profile</button> <button className="search__button-logout" onClick={ event => {
            event.preventDefault()
            onLogout()
        }}>Log out</button>

        <form className="search__form" onSubmit={event => {
            event.preventDefault()

            const query = event.target.query.value

            onSubmit(query)
        }}>
            <input className="search__form-input" type="text" name="query"/>
            <button className="search__form-submit">Search</button>
        </form>
    </section>
}