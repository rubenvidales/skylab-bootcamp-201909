function Search({ user, onEdit, onLogout, onSubmit, onBackCharacters, onBackSeasons, items, error }) {

    return <section className="search">

        <h3>Hi! {user}</h3> <button className="search__button-edit" onClick={event => {

            event.preventDefault()

            onEdit()

        }}>Go to profile</button> <button className="search__button-logout" onClick={event => {

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

        <section className="home">
            <button className="home__button button-characters" onClick={event => { // cambiar className
                event.preventDefault()
                onBackCharacters(items)
            }}>Characters</button>

            <button className="home__button button-episodes" onClick={event => { // cambiar className
                event.preventDefault()
                onBackSeasons()
            }}>Episodes</button>

            {error && <Feedback message={error} />}

            <article className="random-episode episode">
                <h3 className="episode__title">Random Episode: Lorem Ipsum</h3>
                <img className="episode__image" src="http://via.placeholder.com/300?text=season-image" alt="season image" />
            </article>

            <article className="random-character character">
                <h3 className="character__title">Random Character: Lorem Ipsum</h3>
                <img className="character__image" src="http://via.placeholder.com/300?text=season-image" alt="season image" />
            </article>
        </section> 
    </section>
}

